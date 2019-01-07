from django.utils.html import mark_safe
from .app_settings import get_prefix


prefix = get_prefix()


class DefaultRenderer:
    classes = {
        'border': 'fa-border',
        'class': '{}',
        'fixed_width': 'fa-fw',
        'flip': 'fa-flip-{}',
        'li': 'fa-li',
        'pull': 'fa-pull-{}',
        'pulse': 'fa-pulse',
        'rotate': 'fa-rotate-{}',
        'size': '{}',
        'spin': 'fa-spin',
    }

    attrs = {
        'title': 'title="{}"',
        'color': 'style="color:{};"',
    }
    
    def render(self, Icon):
        if Icon.name:
            classes = []
            attrs = []
            for key, value in Icon.kwargs.items():
                if key in self.classes:
                    classes.append(self.classes[key].format(value))
                elif key in self.attrs:
                    attrs.append(self.attrs[key].format(value))

            return mark_safe('<i class="{style_prefix} {prefix}-{name} {classes}" {attrs}></i>'.format(
                style_prefix=Icon.style_prefix,
                prefix=prefix,
                name=Icon.name,
                classes=" ".join(classes),
                attrs=" ".join(attrs)))
        else:
            return ''

class SemanticUIRenderer:

    classes = {
        'bordered': 'bordered',
        'circular': 'circular',
        'colored': '{}',
        'disabled': 'disabled',
        'fitted': 'fitted',
        'flipped': 'flipped {}',
        'inverted': 'inverted',
        'link': 'link',
        'loading': 'loading',
        'rotated': 'rotated {}',
        'size': '{}',
    }

    attrs = {
        'title': 'title="{}"',
    }

    name_map = {
        'arrows alt': 'arrows alternate',
        'arrows alt v': 'arrows alternate vertical',
        'arrows alt h': 'arrows alternate horizontal',
        'ellipsis h': 'ellipsis horizontal',
        'ellipsis v': 'ellipsis vertical',
        'link': 'linkify',
        'line': 'linechat',
        'red river': 'redriver',
        'tachometer alt': 'tachometer alternate'
    }

    def render(self, Icon):
        if Icon.name:
            classes = []
            attrs = []
            for key, value in Icon.kwargs.items():
                if key in self.classes:
                    classes.append(self.classes[key].format(value))
                elif key in self.attrs:
                    attrs.append(self.attrs[key].format(value))

            name = self.name_map[Icon.name] if Icon.name in self.name_map else Icon.name

            return mark_safe('<i class="icon {name} {classes}" {attrs}></i>'.format(
                name=Icon.name.replace("-", " "),
                classes=" ".join(classes),
                attrs=" ".join(attrs)))
        else:
            return ''