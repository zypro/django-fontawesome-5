import os
import json

from .app_settings import get_fontawesome_5_icon_json_path


PATH = get_fontawesome_5_icon_json_path()


def get_icon_choices():

    CHOICES = [(',', '')]

    styles = {
        'brands': 'fab',
        'solid': 'fas',
        'regular': 'far',
        'light': 'fal',
    }

    with open(PATH) as f:
        icons = json.load(f)

    for icon in icons:
        styles_len = 0
        for style in icons[icon]['styles']:
            styles_len = len(icons[icon]['styles'])
            label = icons[icon]['label']
            if styles_len > 1:
                label += " ({})".format(style)
            CHOICES.append((
                '{},{}'.format(styles[style], icon),
                label,
            ))

    return CHOICES
