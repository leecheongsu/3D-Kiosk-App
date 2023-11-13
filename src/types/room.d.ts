export declare type Sweep = {
  label: string;
  key: string;
  value: string;
};

export declare type Room = {
  id: string;
  title: string;
  // vertices: Array<{ x: number; y: number; z: number }>;
  sweeps: Array<Sweep>;
};
