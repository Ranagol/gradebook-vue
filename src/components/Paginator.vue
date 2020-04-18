<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li v-if="currentPage > 1"
          @click="previousPage()"
          class="page-item page-link"
      >
        Previous
      </li>

      <li class="page-item page-link">
        Current Page: {{ currentPage }}
      </li>

      <li v-if="!isLastPage"
          @click="nextPage()"
          class="page-item page-link"
      >
        Next
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Paginator',
  props: {
    disable: {
      required: false,
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      currentPage: 1,
      lastPage: null,
      disabled: this.disable
    }
  },
  computed: {
    isLastPage() {
      return (this.lastPage !== null && this.currentPage >= this.lastPage);
    },
  },
  watch: {
    disable: function(newVal) {
      this.disabled = newVal;
    }
  },
  methods: {
    previousPage() {
      if (this.currentPage <= 1 || this.disabled) {
        return;
      }

      this.currentPage--;
      this.emitPageChange();
    },
    nextPage() {
      if (this.isLastPage || this.disabled) {
        return;
      }

      this.currentPage++;
      this.emitPageChange();
    },
    emitPageChange() {
      this.$emit('change-page', this.currentPage);
    },
    $setLastPage(page) {
      this.lastPage = page;
      this.disabled = false;
      this.previousPage();
    }
  }

}
</script>