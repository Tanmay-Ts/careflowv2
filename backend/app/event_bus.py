# event_bus.py
from collections import deque

class EventBus:
    def __init__(self):
        self.queue = deque()

    def publish(self, events):
        for e in events:
            self.queue.append(e)

    def consume(self, max_events=10):
        events = []
        while self.queue and len(events) < max_events:
            events.append(self.queue.popleft())
        return events