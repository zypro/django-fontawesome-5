from django.conf import settings
from django.utils.html import format_html, mark_safe
from django.utils.html import format_html


prefix = getattr(settings, 'FONTAWESOME_5_PREFIX', 'fa')


class Icon(object):

    def as_html(self):
        if not self.icon and self.style_prefix:
            return ''
        base_string = '<i {title} class="{style_prefix} {prefix}-{icon}{border}{fixed_width}{flip}{li}{pull}{pulse}{rotate}{size}{spin}" {color}></i>'
        return format_html(base_string.format(
            style_prefix=self.style_prefix,
            icon=self.icon,
            prefix=self.prefix,

            title=' title={}'.format(self.title) if self.title else '',
            color='style="color:{};"'.format(self.color) if self.color else '',

            border=' fa-border' if self.border else '',
            fixed_width=' fa-fw' if self.fixed_width else '',
            flip=' fa-flip-{}'.format(self.flip) if self.flip else '',
            li=' fa-li' if self.li else '',
            pull=' fa-pull-{}'.format(self.pull) if self.pull else '',
            pulse=' fa-pulse' if self.pulse else '',
            rotate=' fa-rotate-{}'.format(self.rotate) if self.rotate else '',
            size=' {}'.format(self.size) if self.size else '',
            spin=' fa-spin' if self.spin else '',
        ))

    def __init__(self, style_prefix, icon, title='', color='',
        border=False, fixed_width=False, flip='', li=False, pull='', pulse=False, rotate=0, size='', spin=False):

        self.style_prefix = style_prefix
        self.prefix = prefix
        self.icon = icon
        self.title = title
        self.color = color
        self.border = border
        self.fixed_width = fixed_width
        self.flip = flip
        self.li = li
        self.pull = pull
        self.pulse = pulse
        self.rotate = rotate
        self.size = size
        self.spin = spin

    def __str__(self):
        return "['{}', '{}']".format(self.style_prefix, self.icon_id)

    def __unicode__(self):
        return str(self)

        