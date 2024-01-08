<script>
import { defineComponent } from 'vue';
import axios from 'axios';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { INITIAL_EVENTS, createEventId } from '../../../event-utils.js';

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'dayGridMonth',
        initialEvents: this.loadEventsFromLocalStorage(), // Load events from local storage
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
      },
      currentEvents: [],
    };
  },
  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends;
    },
    handleDateSelect(selectInfo) {
      let title = prompt('Please enter a new title for your event');
      let classid = prompt('Please enter the class ID for your event');
      let year = prompt('Please enter the year');

      let start_time = selectInfo.startStr;
      let end_time = selectInfo.endStr;

      axios.post('http://127.0.0.1:8000/schedule/', {
        title,
        classid,
        year,
        start_time,
        end_time,
        allDay: selectInfo.allDay,
      })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      let calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();

      if (title) {
        const newEvent = {
          id: createEventId(),
          title,
          start: start_time,
          end: end_time,
          allDay: selectInfo.allDay,
          classId: classid,
          yearId: year,
        };

        this.currentEvents.push(newEvent);
        calendarApi.addEvent(newEvent);

        // Save events to local storage whenever currentEvents changes
        this.saveEventsToLocalStorage();
      }
    },
    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();

        // Remove the event from currentEvents and save to local storage
        this.currentEvents = this.currentEvents.filter(event => event.id !== clickInfo.event.id);
        this.saveEventsToLocalStorage();
      }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    // Load events from local storage
    loadEventsFromLocalStorage() {
      const storedEvents = localStorage.getItem('calendarEvents');
      return storedEvents ? JSON.parse(storedEvents) : INITIAL_EVENTS;
    },
    // Save events to local storage
    saveEventsToLocalStorage() {
      localStorage.setItem('calendarEvents', JSON.stringify(this.currentEvents));
    },
  },
});
</script>
<template>
  <div class='demo-app'>
    <div class='demo-app-sidebar'>
      <div class='demo-app-sidebar-section'>
        <h2>Instructions</h2>
        <ul>
          <li>Select dates and you will be prompted to create a new event</li>
          <li>Drag, drop, and resize events</li>
          <li>Click an event to delete it</li>
        </ul>
      </div>
      <div class='demo-app-sidebar-section'>
        <label>
          <input
            type='checkbox'
            :checked='calendarOptions.weekends'
            @change='handleWeekendsToggle'
          />
          toggle weekends
        </label>
      </div>
      <div class='demo-app-sidebar-section'>
        <h2>All Events ({{ currentEvents.length }})</h2>
        <ul>
          <li v-for='event in currentEvents' :key='event.id'>
            <b>{{ event.startStr }}</b>
            <i>{{ event.title }}</i>
          </li>
        </ul>
      </div>
    </div>
    <div class='demo-app-main'>
      <FullCalendar
        class='demo-app-calendar'
        :options='calendarOptions'
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </div>
  </div>
</template>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>
