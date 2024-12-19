import { Box, Button, Container, Link } from "@mui/material";

import { SubmitHandler, useForm } from "react-hook-form";

import xmlbuilder from "xmlbuilder";

import IFormFields from "./interfaces/IFormFields";
import MultiSelect from "./components/MultiSelect";
import TextInput from "./components/TextInput";

import "./App.css";

function App() {
  const { control, handleSubmit } = useForm<IFormFields>({
    defaultValues: {
      filename: "my-sandbox-config.wsb",
      vGPU: "Default",
      Networking: "Default",
      LogonCommand: "",
      AudioInput: "Default",
      VideoInput: "Default",
      ProtectedClient: "Default",
      PrinterRedirection: "Default",
      ClipboardRedirection: "Default",
      MemoryInMB: 1024,
    },
  });
  const onSubmit: SubmitHandler<IFormFields> = (data) => {
    const xml = xmlbuilder
      .create("Configuration", { encoding: "utf-8" })
      // --
      .ele("VGpu", data.vGPU)
      .up()
      // --
      .ele("Networking", data.Networking)
      .up()
      // --
      .ele("MappedFolders")
      .up()
      // --
      .ele("LogonCommand")
      .ele("Command", data.LogonCommand)
      .up()
      .up()
      // --
      .ele("AudioInput", data.AudioInput)
      .up()
      // --
      .ele("VideoInput", data.VideoInput)
      .up()
      // --
      .ele("ProtectedClient", data.ProtectedClient)
      .up()
      // --
      .ele("PrinterRedirection", data.PrinterRedirection)
      .up()
      // --
      .ele("ClipboardRedirection", data.ClipboardRedirection)
      .up()
      // --
      .ele("MemoryInMB", data.MemoryInMB)
      .end({ pretty: true });

    // Generate the .wsb file and download it
    const file = new Blob([xml], { type: "text/xml" });
    const fileURL = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = fileURL;
    link.download = data.filename;
    link.click();

    console.log(xml);
  };

  return (
    <>
      <Container maxWidth="md">
        <h1>Windows Sandbox Configuration File Generator</h1>
        <Box>
          <Link
            href="https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-configure-using-wsb-file"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reference
          </Link>
        </Box>
        <hr />
        <Box
          component="form"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 4 }}
        >
          <Button variant="contained" type="submit" size="large" fullWidth>
            Generate
          </Button>

          <TextInput
            control={control}
            name="filename"
            title="File Name"
            inputProps={{
              pattern: ".*\\.wsb",
            }}
            description="Specifies the name of the file that contains the configuration settings for the sandbox. Must end with .wsb"
          />

          <MultiSelect
            control={control}
            name="vGPU"
            title="vGPU"
            description="Enables or disables GPU sharing."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Enables vGPU support in the sandbox.",
              "Disables vGPU support in the sandbox. If this value is set, the sandbox uses software rendering, which might be slower than virtualized GPU.",
              "This value is the default value for vGPU support. Currently, this default value denotes that vGPU is enabled.",
            ]}
            alert="Enabling virtualized GPU can potentially increase the attack surface of the sandbox."
          />

          <MultiSelect
            control={control}
            name="Networking"
            title="Networking"
            description="Enables or disables networking in the sandbox. You can disable network access to decrease the attack surface exposed by the sandbox."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Enables networking in the sandbox.",
              "Disables networking in the sandbox.",
              "This value is the default value for networking support. This value enables networking by creating a virtual switch on the host and connects the sandbox to it via a virtual NIC.",
            ]}
            alert="Enabling networking can expose untrusted applications to the internal network."
          />

          <h4> MappedFolders (// TODO)</h4>

          <TextInput
            control={control}
            name="LogonCommand"
            title="Logon command"
            description="A path to an executable or script inside the container that will be executed after signing in."
            alert="Although very simple commands will work (such as launching an executable or script), more complicated scenarios involving multiple steps should be placed into a script file. This script file may be mapped into the container via a shared folder, and then executed via the LogonCommand directive."
          />

          <MultiSelect
            control={control}
            name="AudioInput"
            title="Audio input"
            description="Enables or disables audio input to the sandbox."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Enables audio input in the sandbox. If this value is set, the sandbox can receive audio input from the user. Applications that use a microphone may require this capability.",
              "Disables audio input in the sandbox. If this value is set, the sandbox can't receive audio input from the user. Applications that use a microphone may not function properly with this setting.",
              "This value is the default value for audio input support. Currently, this default value denotes that audio input is enabled.",
            ]}
            alert="There may be security implications of exposing host audio input to the container."
          />

          <MultiSelect
            control={control}
            name="VideoInput"
            title="Video input"
            description="Enables or disables video input to the sandbox."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Enables audio input in the sandbox. If this value is set, the sandbox can receive audio input from the user. Applications that use a microphone may require this capability.",
              "Disables audio input in the sandbox. If this value is set, the sandbox can't receive audio input from the user. Applications that use a microphone may not function properly with this setting.",
              "This value is the default value for audio input support. Currently, this default value denotes that audio input is enabled.",
            ]}
            alert="There may be security implications of exposing host video input to the container."
          />

          <MultiSelect
            control={control}
            name="ProtectedClient"
            title="Protected client"
            description="When Protected Client mode is enabled, Sandbox adds a new layer of security boundary by running inside an AppContainer Isolation execution environment."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Runs Windows sandbox in Protected Client mode. If this value is set, the Sandbox runs in AppContainer Isolation.",
              "Runs the Sandbox in the standard mode without extra security mitigations.",
              "This value is the default value for Protected Client mode. Currently, this default value denotes that the sandbox doesn't run in Protected Client mode.",
            ]}
            alert="This setting may restrict the user's ability to copy/paste files in and out of the sandbox."
          />

          <MultiSelect
            control={control}
            name="PrinterRedirection"
            title="Printer redirection"
            description="Enables or disables printer sharing from the host into the sandbox."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Enables sharing of host printers into the sandbox.",
              "Disables printer redirection in the sandbox. If this value is set, the sandbox can't view printers from the host.",
              "This value is the default value for printer redirection support. Currently, this default value denotes that printer redirection is disabled.",
            ]}
          />

          <MultiSelect
            control={control}
            name="ClipboardRedirection"
            title="Clipboard redirection"
            description="Enables or disables sharing of the host clipboard with the sandbox."
            options={["Enable", "Disable", "Default"]}
            optionsDescription={[
              "Enables sharing of the host clipboard with the sandbox.",
              "Disables clipboard redirection in the sandbox. If this value is set, copy/paste in and out of the sandbox is restricted.",
              "This value is the default value for clipboard redirection. Currently, copy/paste between the host and sandbox are permitted under Default.",
            ]}
          />

          <TextInput
            control={control}
            name="MemoryInMB"
            title="Memory in MB"
            inputProps={{
              inputMode: "numeric",
              pattern: "[0-9]*",
            }}
            description="Specifies the amount of memory that the sandbox can use in megabytes (MB)."
            alert="If the memory value specified is insufficient to boot a sandbox, it is automatically increased to the required minimum amount."
          />
        </Box>
      </Container>
    </>
  );
}

export default App;
