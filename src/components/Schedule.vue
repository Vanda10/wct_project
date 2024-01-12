<template>
  <div class="main-content ml-[300px]">
    <div class="flex justify-center mt-3">
      <div class=" mt-[10px] font-bold">Select Floor</div>
      <div class="relative ml-2 mt-[5px]">
        <select v-model="selectedFloor" class="form-control w-[200px]">
          <option value="">Select</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
        </select>
      </div>
      <button class="btn btn-neutral ml-2" @click="searchCalendar">Search</button>
    </div>
    <div class="demo-app">
      <div class="demo-app-main">
        <FullCalendar
          class="demo-app-calendar"
          :options="calendarOptions"
        >
          <template v-slot:dayTop="arg">
            <div class="classroom-title">
              {{ arg.day.date.toISOString().split('T')[0] }}
              <div v-for="event in arg.day.events" :key="event.id">
                <i>{{ event.classroom }}</i>
              </div>
            </div>
          </template>
        </FullCalendar>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';
import { createEventId } from '../event-utils';

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'dayGridMonth',
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        events: [],
      },
      currentEvents: [],
      selectedFloor: '1',
    };
  },
  methods: {
    handleDateSelect(selectInfo) {
      const classroom = prompt('Please enter the classroom');
      const groupCode = prompt('Please enter the group code');

      if (classroom && groupCode) {
        const calendarApi = selectInfo.view.calendar;

        calendarApi.unselect();

        const eventData = {
          title: `${classroom} ${groupCode}`,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: false,
          classroom: classroom,
          group_code: groupCode,
        };

        this.addEventToAPI(eventData);
      }
    },

    async addEventToAPI(eventData) {
      try {
        console.log('Sending data to API:', eventData); // Log the data being sent

        // Adjust eventData to match the expected format by the API
        const formattedData = {
          floor: this.selectedFloor,
          group_code: eventData.group_code,
          classroom: eventData.classroom,
          start_time: eventData.start,
          end_time: eventData.end,
        };

        const response = await axios.post(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/schedule/${this.selectedFloor}`, formattedData);

        console.log('Event added successfully:', response.data);

        await this.fetchData(this.selectedFloor);
      } catch (error) {
        console.error('Error adding event to API:', error);

        // Log validation errors
        if (error.response && error.response.data) {
          console.error('Validation errors:', error.response.data);
        }
      }
    },

    async fetchData(floor) {
      try {
        const response = await axios.get(`https://schoolmanagementapi-46c1c75befdd.herokuapp.com/schedule/${floor}`);
        const group = response.data;

        const events = group.map((event) => ({
          id: createEventId(),
          title: `${event.classroom} ${event.group_code}`,
          start: event.start_time,
          end: event.end_time,
          allDay: false,
          classroom: event.classroom,
        }));

        console.log('Fetched data from API:', events);

        this.calendarOptions.events = events;
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    },

    handleEventClick(clickInfo) {
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove();
      }
    },

    async searchCalendar() {
      await this.fetchData(this.selectedFloor);
      console.log('Calendar Events:', this.calendarOptions.events);
    },
  },

  async mounted() {
    await this.fetchData(this.selectedFloor);
    console.log('Calendar Events:', this.calendarOptions.events);
  },
});
</script>


<style lang='css'>
/* Add your styles here */
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

b {
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

.fc {
  max-width: 1100px;
  margin: 0 auto;
}

.classroom-title {
  margin-top: 10px;
  font-weight: bold;
}

.dropdown-container {
  position: relative;
  z-index: 1;
}

</style>