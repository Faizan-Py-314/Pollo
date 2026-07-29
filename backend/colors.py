import random

PRESET_COLORS = [
    'amber', 'cyan', 'emerald', 'indigo', 'red', 'orange', 'yellow', 'lime', 
    'green', 'teal', 'sky', 'blue', 'violet', 'purple', 'fuchsia', 'pink', 
    'rose', 'slate', 'zinc', 'stone'
  ]

def generate_unique_colors(count: int) -> list[str]:
    if count <= len(PRESET_COLORS):
        return random.sample(PRESET_COLORS, count)
    
    colors = set()
    while len(colors) < count:
        random_hex = f"#{random.randint(0, 0xFFFFFF):06x}"
        colors.add(random_hex)
    return list(colors)

