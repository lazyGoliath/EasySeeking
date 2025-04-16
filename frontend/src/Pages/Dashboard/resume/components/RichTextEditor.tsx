import { Brain, LoaderCircle } from "lucide-react";
import { useContext, useState } from "react";
//import { AiChatSession } from ""
import {
    BtnBold,
    BtnBulletList,
    //BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnStrikeThrough,
    //BtnStyles,
    BtnUnderline,
    Editor,
    EditorProvider,
    //HtmlButton,
    Separator,
    Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "../../../../../service/AiModel";
import { ResumeInfoContext } from "../../../../context/ResumeContextInfo";
import { Button } from "../../../../components/ui/button";

interface RichTextEditorProps {
    onRichTextEditorChange: (event: any) => void;
    index: number;
    defaultValue: string;
}

const PROMPT =
  "Based on the provided position title {positionTitle}, generate 5-7 bullet points for the work experience section of a resume. Each bullet point should highlight key responsibilities, achievements, or skills related to the role, avoiding the inclusion of experience level or personal details. The output should be in HTML format, with each bullet point wrapped in <li> tags. Ensure the summary is tailored to the position title and reflects common tasks or responsibilities for that role";
function RichTextEditor({ onRichTextEditorChange, index, defaultValue }: RichTextEditorProps) {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const GenerateSummaryFromAI = async () => {
    
    if (!resumeInfo?.experience[index]?.positionTitle) {
      //toast("Please Add Position Title");
      return;
    }
    setLoading(true);
    const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo.experience[index].positionTitle
    );

    console.log("Prompt passed to AI experience summary : ", prompt);

    const result = await AIChatSession.sendMessage(prompt);
    console.log(result.response.text());
    const resp = result.response.text();
    setValue(resp.replace("[", "").replace("]", ""));
    setLoading(false);
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor