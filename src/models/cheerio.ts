export interface Text {
  parent: Label;
  prev: Child;
  next: Child;
  type: "text";
  data: string;
}

export interface Label {
  parent: Label;
  children: Child[];
  prev: Child;
  next: Child;
  type: "tag";
  name: string;
  attribs: {
    href?: string;
    class?: string;
    src?: string;
  };
}

export type Child = Label | Text;
