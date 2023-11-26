import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from "@angular/core";
import * as ace from "ace-builds";

@Component({
  selector: "app-code-editor",
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit, OnChanges {

  @Input() code: String = "";
  @Input() language: number = 0;
  @Input() index: number = 0;
  @Output() editorDataEvent = new EventEmitter<Object[]>();

  @ViewChild("editor")
  private editor!: ElementRef<HTMLElement>;

  aceEditor: any;
  editorSetup = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.editorSetup) {
      this.updateEditorLanguage(this.language);
    }
  }

  ngAfterViewInit(): void {

    ace.config.set('basePath', 'https://unpkg.com/ace-builds@1.4.12/src-noconflict');
    ace.config.set("fontSize", "14px");
    this.aceEditor = ace.edit(this.editor.nativeElement);
    this.aceEditor.setTheme('ace/theme/chrome');
    this.aceEditor.getSession().setUseWorker(false);
    this.updateEditorLanguage(this.language);
    this.editorSetup = true;

  }

  // Update Editor Language

  updateEditorLanguage(language: number) {

    switch (+language) {
      case 0: {
        this.aceEditor.session.setMode('ace/mode/c_cpp');
        if (this.code == "") {
          this.aceEditor.session.setValue("// Code Here\n\n#include <stdio.h>\n\nint main() {\n\tprintf(\"Hello World\");\n\treturn 0;\n}");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 1: {
        this.aceEditor.session.setMode('ace/mode/csharp');
        if (this.code == "") {
          this.aceEditor.session.setValue("// Code Here\n\nclass Hello {\n\tstatic void Main(string[] args){\n\t\tConsole.WriteLine(\"Hello World\");\n\t}\n}");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 2: {
        this.aceEditor.session.setMode('ace/mode/css');
        if (this.code == "") {
          this.aceEditor.session.setValue("/* Code Here */\n\n.helloWorld {\n\tmargin-left: 200px;\n\tbackground-color: red;\n}");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 3: {
        this.aceEditor.session.setMode('ace/mode/html');
        if (this.code == "") {
          this.aceEditor.session.setValue("<!-- Code Here -->\n\n<html>\n\t<body>\n\t\t<h1>Hello World</h1>\n\t</body>\n</html>");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 4: {
        this.aceEditor.session.setMode('ace/mode/java');
        if (this.code == "") {
          this.aceEditor.session.setValue("// Code Here\n\nclass Hello {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 5: {
        this.aceEditor.session.setMode('ace/mode/javascript');
        if (this.code == "") {
          this.aceEditor.session.setValue("// Code Here\n\nfunction hello() {\n\talert(\"Hello World\");\n}");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 6: {
        this.aceEditor.session.setMode('ace/mode/php');
        if (this.code == "") {
          this.aceEditor.session.setValue("<!--Code Here-->\n\n<?php\n\techo \"Hello World\";\n?>");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 7: {
        this.aceEditor.session.setMode('ace/mode/python');
        if (this.code == "") {
          this.aceEditor.session.setValue("# Code Here\n\ndef main():\n\tprint(\"Hello World\")\n\nif __name__ == \"__main__\":\n\tmain()");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 8: {
        this.aceEditor.session.setMode('ace/mode/sql');
        if (this.code == "") {
          this.aceEditor.session.setValue("/* Code Here */\n\nCREATE TABLE helloworld (phrase TEXT);\nINSERT INTO helloworld VALUES (\"Hello World\");\nSELECT COUNT(*) FROM helloworld;");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      case 9: {
        this.aceEditor.session.setMode('ace/mode/typescript');
        if (this.code == "") {
          this.aceEditor.session.setValue("// Code Here\n\nlet message: string = 'Hello World';\n\nlet heading = document.createElement('h1');\nheading.textContent = message;\n\ndocument.body.appendChild(heading);");
        }
        else {
          this.aceEditor.session.setValue(this.code);
        }
        break;
      }
      default: {
        break;
      }
    }

  }

  // Send Data to Lesson

  sendDataToLesson() {

    this.editorDataEvent.emit([this.aceEditor.getSession().getValue(), this.index]);
  }

}