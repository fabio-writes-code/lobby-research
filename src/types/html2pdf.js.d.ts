declare module "html2pdf.js" {
  export interface Html2PdfOptions {
    margin?: number;
    filename?: string;
    image?: { type: string; quality: number };
    html2canvas?: { scale: number; logging: boolean; dpi: number };
    jsPDF?: {
      unit: "in" | "pt" | "mm" | "cm";
      format: "a3" | "a4" | "a5" | "letter" | "legal";
      orientation: "portrait" | "landscape";
    };
  }
  export interface Html2Pdf {
    from: (element: HTMLElement | string) => this;
    set: (options: Html2PdfOptions) => this;
    save: (filename?: string) => Promise<void>;
  }

  function html2pdf(): Html2Pdf;

  export default html2pdf;

  ``;
}

// export type Html2PdfType = {
//   from: (element: HTMLElement) => {
//     set: (options: object) => {
//       save: () => Promise<void>;
//     };
//   };
// };
