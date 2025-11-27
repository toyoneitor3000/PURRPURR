import google.generativeai as genai
import inspect

print(inspect.signature(genai.configure))
print(genai.configure.__doc__)
