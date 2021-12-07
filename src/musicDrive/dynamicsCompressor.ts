/**
 * @author Funny002
 * @email funnydsu@gmail.com
 * @href https://github.com/Funny002
 * @dateTime 2021/12/4 12:04
 */

type SetState = number | undefined | AudioParam

export default class DynamicsCompressor {
  private Context: AudioContext;
  private Source: AudioBufferSourceNode;
  private readonly Compressor: DynamicsCompressorNode;

  constructor (AudioContext: AudioContext, Source: AudioBufferSourceNode) {
    this.Source = Source; // 引用
    this.Context = AudioContext; // 引用
    this.Compressor = AudioContext.createDynamicsCompressor();
  }

  // 超过该值的压缩将开始生效的分贝值，k速率
  public set threshold (value: SetState) {
    value !== undefined && this.Compressor.threshold.setValueAtTime(value as number, this.Context.currentTime);
  }

  // 超过该值的压缩将开始生效的分贝值，k速率
  public get threshold (): AudioParam {
    return this.Compressor.threshold;
  }

  // 曲线平滑过渡到压缩部分的阈值以上的范围，k速率
  public set knee (value: SetState) {
    value !== undefined && this.Compressor.knee.setValueAtTime(value as number, this.Context.currentTime);
  }

  // 曲线平滑过渡到压缩部分的阈值以上的范围，k速率
  public get knee (): AudioParam {
    return this.Compressor.knee;
  }

  // 输入中输出中 1 dB 变化所需的变化量，k速率
  public set ratio (value: SetState) {
    value !== undefined && this.Compressor.ratio.setValueAtTime(value as number, this.Context.currentTime);
  }

  // 输入中输出中 1 dB 变化所需的变化量，k速率
  public get ratio (): AudioParam {
    return this.Compressor.ratio;
  }

  // 当前对信号施加的增益降低量
  public get reduction (): number {
    return this.Compressor.reduction;
  }

  // 增益降低 10 dB 所需的时间, s/dB
  public set attack (value: SetState) {
    value !== undefined && this.Compressor.attack.setValueAtTime(value as number, this.Context.currentTime);
  }

  // 增益降低 10 dB 所需的时间, s/dB
  public get attack (): AudioParam {
    return this.Compressor.attack;
  }

  // 增益增加 10 dB 所需的时间, s/dB
  public set release (value: SetState) {
    value !== undefined && this.Compressor.release.setValueAtTime(value as number, this.Context.currentTime);
  }

  // 增益增加 10 dB 所需的时间, s/dB
  public get release (): AudioParam {
    return this.Compressor.release;
  }

  // 开始
  public start () {
    this.Source.connect(this.Compressor);
    this.Compressor.connect(this.Context.destination);
    this.Source.disconnect(this.Context.destination);
  }

  // 关闭
  public close () {
    this.Source.disconnect(this.Context.destination);
    this.Source.connect(this.Compressor);
    this.Compressor.connect(this.Context.destination);
  }
}
