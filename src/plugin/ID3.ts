import { TagType } from 'jsmediatags/types';

export interface ID3Options {
  year: string; // 年份
  type: string; // 类型
  title: string; // 标题
  album: string; // 专辑
  artist: string; // 作者
  picture: string; // 图片
  allInfo?: TagType; // 其他
}

export default function (data: Object, allInfo = false): Promise<ID3Options> {
  const jsmediatags = window.jsmediatags;
  return new Promise<ID3Options>((resolve, reject) => {
    jsmediatags.read(data, {
      onError: reject,
      onSuccess (tag: TagType): void {
        const object: ID3Options = {
          picture: '',
          type: tag.type,
          year: tag.tags.year || '',
          title: tag.tags.title || '',
          album: tag.tags.album || '',
          artist: tag.tags.artist || '',
          allInfo: allInfo ? tag : undefined
        };
        if (tag.tags.picture) { // 有专辑图片
          const {data: album, format} = tag.tags.picture;
          object.picture = `data:${format};base64,${btoa(album.map(v => String.fromCharCode(v)).join(''))}`;
        }
        resolve(object);
      }
    });
  });
}
