import type MultiSelectionOption from "../types/MultiSelectionOption";

export default interface IFormFields {
  filename: string;

  vGPU: MultiSelectionOption;
  Networking: MultiSelectionOption;

  // MappedFolders: string;
  LogonCommand: string;

  AudioInput: MultiSelectionOption;
  VideoInput: MultiSelectionOption;
  ProtectedClient: MultiSelectionOption;
  PrinterRedirection: MultiSelectionOption;
  ClipboardRedirection: MultiSelectionOption;

  MemoryInMB: number;
}
