<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-content" :style="customContentStyle">
            <div class="modal-header">
              <slot name="header"></slot>
            </div>

            <div class="modal-body">
              <slot name="body"></slot>
            </div>

            <div class="modal-footer">
              <slot name="footer"></slot>
            </div>

            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    customContentStyle: Object,
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  padding: 0;
  margin: 0;
}

.modal-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.modal-header:empty,
.modal-body:empty,
.modal-footer:empty {
  display: none;
}

.modal-header,
.modal-body,
.modal-footer {
  padding: 0.5rem;
  background-color: #fff;
  width: 100%;
}

.modal-header {
  text-align: left;
  color: var(--primary);
  font-weight: bold;
}

.modal-footer {
  text-align: right;
}

/*
 * Modal transition
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
