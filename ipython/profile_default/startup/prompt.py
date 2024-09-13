from IPython.terminal.prompts import Prompts, Token
from datetime import datetime
import os
import platform


def get_git_branch():
    try:
        with open(".git/HEAD") as f:
            ref = f.readline().strip()
            if ref.startswith("ref:"):
                return f"  {ref.split("/")[-1]} "
    except FileNotFoundError:
        return " "


class MyPrompt(Prompts):
    def in_prompt_tokens(self, cli=None):
        hostname = platform.node()
        user = os.getlogin()
        cwd = os.getcwd()
        git_branch = get_git_branch()
        home = os.environ.get("HOME")

        if cwd == home:
            dirLabel = "󱂵 "
            cwd = "~"
        else:
            dirLabel = " "

        return [
            (Token.PromptPycon, " "),
            (Token.Prompt, f"{user}@{hostname} "),
            (Token.PromptDirLabel, dirLabel),  # Current working directory
            (Token.PromptCWD, {cwd}),  # Current working directory
            (Token.PromptGit, git_branch),
            (Token.PromptBracket, "["),
            (Token.PromptNum, str(self.shell.execution_count)),  # Command number
            (Token.PromptBracket, "] "),  # Static text ' (' before cwd
            (Token.PromptArrow, " "),
        ]

    def out_prompt_tokens(self):
        current_time = datetime.now().strftime("%H:%M:%S")
        return [
            (Token.OutPrompt, "("),
            (Token.OutPromptTime, current_time),
            (Token.OutPrompt, ") "),
            (Token.OutPromptArrow, ">>> "),
        ]
