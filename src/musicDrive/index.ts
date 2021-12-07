/**
 * @author Funny002
 * @email funnydsu@gmail.com
 * @href https://github.com/Funny002
 * @dateTime 2021/12/3 14:07
 */

import DynamicsCompressor from './dynamicsCompressor';

interface Options {
  change?: ((tamp: AudioTimestamp) => void);
}

interface State {
  type: 'ready' | 'start' | 'pause' | 'end';
}

class MusicDrive {

  private options: Options = {
    // 声音大小 0.00 -> 1.00
    // 是否静音
    // 是否播放
    // 当前进度
    // 总共进度
    // 加载中
    // 调音器 // 暂不做
    // 播放回调方法
    // 加载成功
    // 初始化成功
    // 开始播放
    // 播放结束
    // 返回状态 'ready',‘start’,'pause','end'
  };

  private rAF?: number;
  private Gain: GainNode;
  private Analyser: AnalyserNode;
  private Compressor: DynamicsCompressor;
  private readonly AudioContext: AudioContext;
  private readonly Source: AudioBufferSourceNode;

  private getState (): State {
    return {
      type: 'ready'
    }; // 这是一个状态
  }

  private outputTimestamp () {
    const timesTamp = this.AudioContext.getOutputTimestamp();
    // 输出给 change
    if (this.options.change) this.options.change(timesTamp);
    // 持续输出
    this.rAF = requestAnimationFrame(this.outputTimestamp);
  }

  constructor (options?: Options, callback?: ((state: State) => void)) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    // 初始化播放器
    this.AudioContext = new AudioContext();
    // 声音处理器
    this.Gain = this.AudioContext.createGain();
    // 音频可视化
    this.Analyser = this.AudioContext.createAnalyser();
    // 音频流
    this.Source = this.AudioContext.createBufferSource();
    // 连接播放器
    this.Source.connect(this.AudioContext.destination);
    // 调音器
    this.Compressor = new DynamicsCompressor(this.AudioContext, this.Source);
    // 创建成功后触发一个回调
    callback && callback(this.getState());
  }

  public Play () {
    // 开始播放
    this.Source.start();
    this.rAF = requestAnimationFrame(this.outputTimestamp);
  };

  public Pause () {
    // 暂停
    this.Source.stop();
    this.rAF && cancelAnimationFrame(this.rAF);
  };

  public set volume (value: number) {

  }

  public get volume (): number {
    return 0;
  }

  public close (callback: (() => void)) {
    this.AudioContext.close().then(callback);
  }
}
