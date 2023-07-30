# Development Policies

## Git commit rules

For any commit use the "Editor method" which is explained below:
Run `git commit` without a message or option and it'll open up your default text editor to write a commit message.

To configure your "default" editor:

```
git config --global core.editor "code --wait"
```

The `"code --wait"` determine VSCode as the default editor. Replace it with "emacs," "vim," or whatever your preference is.

In the opened editor, the first line is the subject (short description), leave a blank line after it, and everything else is the extended description (body).

### Format:

---

Issue:_{{ISSUE-ID}}_ _{{COMMIT-TYPE}}_: _{{CHANGES-TITLE}}_

_{{EMPTY-LINE}}_

_{{DESCRIPTION}}_

---

| Ref name          | Explantion                                                                             | Sample                            |
| ----------------- | -------------------------------------------------------------------------------------- | --------------------------------- |
| {{ISSUE-ID}}      | Must be replaced with issue ID which set in the Git Issues(or any other issue tracker) | #1                                |
| {{COMMIT-TYPE}}   | It is explained in the next part: \* [Commit Types](#commit-types)                     | e.g: Feat:                        |
| {{CHANGES-TITLE}} | Title of the commit goes here                                                          | Init commit                       |
| {{EMPTY-LINE}}    | Leave a blank line here                                                                | -                                 |
| {{DESCRIPTION}}   | The description of the commit goes here, in every commits it should not leave empty    | e.g: Initialize the loader module |

### Sample commit:

```
Issue:#1 Feat:Init commit

Initialize the project and set the required configs. also installed below npm packages additionaly:
- lodash
- @types/lodash
- vite-plugin-css-injected-by-js
```

### Commit Types:

- feat: The new feature you're adding to a particular application
- fix: A bug fix
- style: Feature and updates related to styling
- refactor: Refactoring a specific section of the codebase
- test: Everything related to testing
- docs: Everything related to documentation
- chore: Regular code maintenance.[ You can also use emojis to represent commit types]
