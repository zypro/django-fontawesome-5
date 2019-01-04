import os
import json

from django.conf import settings

PATH = getattr(settings, 'FONTAWESOME_5_ICONS_JSON', os.path.join(os.path.dirname(__file__), 'icons.json'))

def get_icon_choices():

    CHOICES = [('', '')]

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
                [
                    styles[style],
                    icon,
                ],
                label,
            ))

    return CHOICES
