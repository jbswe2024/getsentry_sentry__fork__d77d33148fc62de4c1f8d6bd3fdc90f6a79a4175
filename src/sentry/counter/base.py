"""
sentry.counter.base
~~~~~~~~~~~~~~~~~~~

:copyright: (c) 2010-2012 by the Sentry Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""


class Counter(object):
    """
    Counters are temporary stores for querying real-time counts of events.

    Specifically, they store the following distinct counters:

    - events (global)
    - events per team
    - events per project
    - events per group

    Each grouping tracks the following:

    - # of total events
    - # of unique events

    Each counter stores counts at minute-level intervals for 15 minutes.
    """
    def __init__(self, **options):
        pass

    def incr(self, amount=1, is_new=False, **kwargs):
        """
        >>> incr(1, team_id=1, project_id=1, group_id=1, is_new=False)
        """
        pass

    def total(self, key, value, minutes=None):
        return None

    def unique(self, key, value, minutes=None):
        return None
