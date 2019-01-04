from __future__ import unicode_literals

from django import template
from django.conf import settings
from django.contrib.staticfiles.templatetags.staticfiles import static
from django.utils.html import format_html, mark_safe

register = template.Library()


@register.simple_tag
def fa5_icon(
    style_prefix, icon, color=False, title='',
    border=False, fixed_width=False, flip=False, li=False, pull=False, pulse=False, rotate=False, size=False, spin=False):

    return mark_safe('<i {title} class="{style_prefix} {prefix}-{icon}{border}{fixed_width}{flip}{li}{pull}{pulse}{rotate}{size}{spin}" {color}></i>'.format(
        style_prefix=style_prefix,
        icon=icon,
        prefix=getattr(settings, 'FONTAWESOME_PREFIX', 'fa'),

        color='style="color:{};"'.format(color) if color else '',
        title=' title={}'.format(title) if title else '',

        border=' fa-border' if border else '',
        fixed_width=' fa-fw' if fixed_width else '',
        flip=' fa-flip-{}'.format(flip) if flip else '',
        li=' fa-li' if li else '',
        pull=' fa-pull-{}'.format(pull) if pull else '',
        pulse=' fa-pulse' if pulse else '',
        rotate=' fa-rotate-{}'.format(rotate) if rotate else '',
        size=' {}'.format(size) if size else '',
        spin=' fa-spin' if spin else '',
    ))


@register.simple_tag
def fontawesome5_static():
    fontawesome_css = format_html(
        '<link href="{0}" rel="stylesheet" media="all">\n',
        getattr(settings, 'FONTAWESOME_CSS_URL', static('fontawesome/css/all.min.css')))
    dfa_css = format_html(
        '<link href="{0}" rel="stylesheet" media="all">\n', 
        static('fontawesome/css/django-fontawesome.css'))
    dfa_js = format_html(
            '<script type="text/javascript" src="{}"></script>\n',
            static('fontawesome/js/django-fontawesome.js'))
    return fontawesome_css + dfa_css + dfa_js
