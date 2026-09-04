import React, { useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import COLORS from '../theme/colors';


const CodeBlock = ({
  code = '',
  language = '',
}) => {

  const [copied, setCopied] =
    useState(false);


  // ==================================================
  // CLEAN LANGUAGE
  // ==================================================

  const cleanLanguage =
    String(language || '')
      .trim()
      .toLowerCase();


  // ==================================================
  // LANGUAGE LABEL
  // ==================================================

  const getLanguageLabel = () => {

    const languages = {

      javascript: 'JS',
      js: 'JS',

      typescript: 'TS',
      ts: 'TS',

      jsx: 'JSX',

      tsx: 'TSX',

      python: 'PY',

      py: 'PY',

      java: 'JAVA',

      kotlin: 'KOTLIN',

      swift: 'SWIFT',

      php: 'PHP',

      c: 'C',

      cpp: 'C++',

      'c++': 'C++',

      csharp: 'C#',
      'c#': 'C#',

      go: 'GO',

      rust: 'RUST',

      ruby: 'RUBY',

      sql: 'SQL',

      html: 'HTML',

      css: 'CSS',

      json: 'JSON',

      xml: 'XML',

      bash: 'BASH',

      shell: 'SHELL',

      sh: 'SH',

      powershell: 'PS',

      plaintext: 'TEXT',

      text: 'TEXT',
    };


    return (
      languages[cleanLanguage] ||
      (cleanLanguage
        ? cleanLanguage.toUpperCase()
        : 'CODE')
    );
  };


  // ==================================================
  // COPY CODE
  // ==================================================

  const copyCode = () => {

    Clipboard.setString(
      String(code || '')
    );


    setCopied(true);


    setTimeout(() => {

      setCopied(false);

    }, 1500);
  };


  // ==================================================
  // SIMPLE SYNTAX COLORING
  // ==================================================
  //
  // React Native Text allows nested Text
  // components, so we can provide lightweight
  // syntax styling without adding a heavy
  // syntax-highlighting dependency.
  //
  // ==================================================

  const renderHighlightedCode = () => {

    const text =
      String(code || '');


    const lines =
      text.split('\n');


    return lines.map(
      (line, lineIndex) => (

        <Text
          key={`line-${lineIndex}`}
          style={styles.codeLine}
        >

          <Text
            style={styles.lineNumber}
          >
            {String(lineIndex + 1).padStart(2, ' ')}
          </Text>


          <Text>
            {'  '}
          </Text>


          {highlightLine(line)}

          {lineIndex < lines.length - 1
            ? '\n'
            : ''}

        </Text>

      )
    );
  };


  // ==================================================
  // HIGHLIGHT LINE
  // ==================================================

  const highlightLine = line => {

    if (!line) {
      return <Text>{' '}</Text>;
    }


    /*
     * Tokenizer.
     *
     * This intentionally provides lightweight
     * syntax styling suitable for React Native.
     */

    const tokenRegex =
      /(\/\/.*$|#.*$|\/\*.*?\*\/|'[^']*'|"[^"]*"|`[^`]*`|\b(?:const|let|var|function|return|if|else|for|while|class|new|import|from|export|default|async|await|try|catch|throw|extends|public|private|protected|static|interface|type|def|in|and|or|not|True|False|None|null|undefined|true|false|SELECT|FROM|WHERE|INSERT|INTO|UPDATE|DELETE|CREATE|TABLE|VALUES|JOIN|ON|AS|AND|OR)\b|\b\d+(?:\.\d+)?\b)/g;


    const parts =
      line.split(tokenRegex);


    return parts.map(
      (part, index) => {

        if (!part) {
          return null;
        }


        // COMMENTS

        if (
          part.startsWith('//') ||
          part.startsWith('#') ||
          (
            part.startsWith('/*') &&
            part.endsWith('*/')
          )
        ) {

          return (

            <Text
              key={index}
              style={styles.comment}
            >
              {part}
            </Text>

          );
        }


        // STRINGS

        if (
          (
            part.startsWith('"') &&
            part.endsWith('"')
          ) ||

          (
            part.startsWith("'") &&
            part.endsWith("'")
          ) ||

          (
            part.startsWith('`') &&
            part.endsWith('`')
          )
        ) {

          return (

            <Text
              key={index}
              style={styles.string}
            >
              {part}
            </Text>

          );
        }


        // KEYWORDS

        const keywordList = [

          'const',
          'let',
          'var',
          'function',
          'return',
          'if',
          'else',
          'for',
          'while',
          'class',
          'new',
          'import',
          'from',
          'export',
          'default',
          'async',
          'await',
          'try',
          'catch',
          'throw',
          'extends',
          'public',
          'private',
          'protected',
          'static',
          'interface',
          'type',
          'def',
          'in',
          'and',
          'or',
          'not',
          'True',
          'False',
          'None',
          'null',
          'undefined',
          'true',
          'false',
          'SELECT',
          'FROM',
          'WHERE',
          'INSERT',
          'INTO',
          'UPDATE',
          'DELETE',
          'CREATE',
          'TABLE',
          'VALUES',
          'JOIN',
          'ON',
          'AS',
          'AND',
          'OR',
        ];


        if (
          keywordList.includes(
            part
          )
        ) {

          return (

            <Text
              key={index}
              style={styles.keyword}
            >
              {part}
            </Text>

          );
        }


        // NUMBERS

        if (
          /^\d+(?:\.\d+)?$/.test(part)
        ) {

          return (

            <Text
              key={index}
              style={styles.number}
            >
              {part}
            </Text>

          );
        }


        // NORMAL TEXT

        return (

          <Text
            key={index}
            style={styles.normal}
          >
            {part}
          </Text>

        );
      }
    );
  };


  // ==================================================
  // RENDER
  // ==================================================

  return (

    <View
      style={styles.container}
    >

      {/* ============================================
          CODE HEADER
      ============================================ */}

      <View
        style={styles.header}
      >

        <View
          style={styles.languageContainer}
        >

          <View
            style={styles.codeDot}
          />

          <Text
            style={styles.languageText}
          >
            {getLanguageLabel()}
          </Text>

        </View>


        <TouchableOpacity
          style={styles.copyButton}
          onPress={copyCode}
          activeOpacity={0.7}
        >

          <Text
            style={styles.copyIcon}
          >
            {copied ? '✓' : '⧉'}
          </Text>


          <Text
            style={styles.copyText}
          >
            {copied ? 'Copied' : 'Copy'}
          </Text>

        </TouchableOpacity>

      </View>


      {/* ============================================
          CODE CONTENT
      ============================================ */}

      <ScrollView

        horizontal

        showsHorizontalScrollIndicator={
          false
        }

        style={styles.codeScroll}

        contentContainerStyle={
          styles.codeContent
        }

      >

        <View>

          {renderHighlightedCode()}

        </View>

      </ScrollView>

    </View>
  );
};


// ======================================================
// STYLES
// ======================================================

const styles = StyleSheet.create({

  container: {

    width: '100%',

    backgroundColor:
      '#080E17',

    borderWidth: 1,

    borderColor:
      '#1D2B40',

    borderRadius: 12,

    overflow: 'hidden',

    marginTop: 7,

    marginBottom: 12,
  },


  // ====================================================
  // HEADER
  // ====================================================

  header: {

    height: 38,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent:
      'space-between',

    paddingHorizontal: 11,

    backgroundColor:
      '#0D1623',

    borderBottomWidth: 1,

    borderBottomColor:
      '#1B293D',
  },


  languageContainer: {

    flexDirection: 'row',

    alignItems: 'center',
  },


  codeDot: {

    width: 7,

    height: 7,

    borderRadius: 4,

    backgroundColor:
      COLORS.primary,

    marginRight: 7,
  },


  languageText: {

    color:
      '#8192A8',

    fontSize: 9,

    fontWeight: '800',

    letterSpacing: 1.2,
  },


  // ====================================================
  // COPY
  // ====================================================

  copyButton: {

    height: 28,

    borderRadius: 8,

    paddingHorizontal: 8,

    flexDirection: 'row',

    alignItems: 'center',

    justifyContent: 'center',

    backgroundColor:
      '#121E2D',

    borderWidth: 1,

    borderColor:
      '#203149',
  },


  copyIcon: {

    color:
      '#8EA3BD',

    fontSize: 12,

    marginRight: 5,
  },


  copyText: {

    color:
      '#8EA3BD',

    fontSize: 10,

    fontWeight: '700',
  },


  // ====================================================
  // CODE
  // ====================================================

  codeScroll: {

    maxHeight: 430,
  },


  codeContent: {

    paddingVertical: 12,

    paddingRight: 20,

    minWidth: '100%',
  },


  codeLine: {

    fontFamily:
      'monospace',

    fontSize: 12.5,

    lineHeight: 20,
  },


  lineNumber: {

    color:
      '#3F5066',

    fontFamily:
      'monospace',

    fontSize: 11,

  },


  normal: {

    color:
      '#D4DEEA',

  },


  keyword: {

    color:
      '#C792EA',

    fontWeight: '600',

  },


  string: {

    color:
      '#A8D8A8',

  },


  number: {

    color:
      '#F6C177',

  },


  comment: {

    color:
      '#61758D',

    fontStyle: 'italic',

  },

});


export default CodeBlock;