"use client";

class VitalAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;

  constructor() {
    // Lazy initialize on first interaction
  }

  private initContext() {
    if (typeof window === "undefined") return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.initContext();
      this.playBeep(988, 0.08); // B5 note confirming sound on
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public playPulseBeep(frequency: number = 880) {
    if (this.isMuted) return;
    this.playBeep(frequency, 0.06);
  }

  private playBeep(freq: number, duration: number) {
    try {
      this.initContext();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      // Soft pleasant hospital pulse oximeter tone
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Smooth attack and decay envelope
      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Audio playback silently suppressed if blocked by browser
    }
  }
}

export const vitalAudio = new VitalAudioSynthesizer();

