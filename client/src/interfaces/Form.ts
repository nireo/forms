// This is here because gin has a bug where it doesn't accept booleans which are valued false,
// so I rather keep them in string format
export interface FormSettingsStringFormat {
  receiveMessages: string;
  customMessage: string;
}
