import React from "react";

/** Simple syntax highlighter for JSX/Liquid/CSS code */
export function highlightCode(
  code: string,
  lang: "react" | "liquid" | "tokens"
): React.ReactNode[] {
  if (lang === "tokens") {
    return code.split("\n").map((line, i) => {
      const highlighted = line
        .replace(/(--[\w-]+)/g, '<span style="color:#79c0ff">$1</span>')
        .replace(
          /(:)(\s*)([^;]+)(;)/g,
          '$1$2<span style="color:#a5d6ff">$3</span>$4'
        );
      return (
        <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + "\n" }} />
      );
    });
  }

  if (lang === "liquid") {
    return code.split("\n").map((line, i) => {
      const highlighted = line
        .replace(
          /(&lt;!--|<!--)(.*?)(--&gt;|-->)/g,
          '<span style="color:#6a737d">$1$2$3</span>'
        )
        .replace(
          /(class)="([^"]*)"/g,
          '<span style="color:#79c0ff">$1</span>="<span style="color:#a5d6ff">$2</span>"'
        )
        .replace(
          /(&lt;|<)(\/?)([\w-]+)/g,
          '$1$2<span style="color:#7ee787">$3</span>'
        )
        .replace(
          /({{-?\s*)([\w.| ]+)(\s*-?}})/g,
          '<span style="color:#d2a8ff">$1$2$3</span>'
        );
      return (
        <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + "\n" }} />
      );
    });
  }

  // React/JSX
  return code.split("\n").map((line, i) => {
    let highlighted = line
      // strings (double quotes)
      .replace(
        /"([^"]*)"/g,
        '"<span style="color:#a5d6ff">$1</span>"'
      )
      // keywords
      .replace(
        /\b(import|from|export|const|let|function|return|type)\b/g,
        '<span style="color:#ff7b72">$1</span>'
      )
      // JSX component tags
      .replace(
        /(<\/?)((?:A-Z)[A-Za-z]*)/g,
        '$1<span style="color:#d2a8ff">$2</span>'
      )
      // JSX prop names (word followed by =)
      .replace(
        /\b(\w+)(=)/g,
        '<span style="color:#79c0ff">$1</span>$2'
      )
      // braces with numbers
      .replace(
        /\{(\d+\.?\d*)\}/g,
        '{<span style="color:#e3b341">$1</span>}'
      )
      // boolean/special values
      .replace(
        /\{(true|false)\}/g,
        '{<span style="color:#ff7b72">$1</span>}'
      );

    // Highlight component names after < (uppercase start)
    highlighted = highlighted.replace(
      /(&lt;|<)(\/?)\b([A-Z]\w*)/g,
      '$1$2<span style="color:#d2a8ff">$3</span>'
    );

    return (
      <span key={i} dangerouslySetInnerHTML={{ __html: highlighted + "\n" }} />
    );
  });
}
