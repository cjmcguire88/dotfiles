# 00-custom_prompt.py
from prompt import MyPrompt

get_ipython().prompts = MyPrompt(get_ipython())
