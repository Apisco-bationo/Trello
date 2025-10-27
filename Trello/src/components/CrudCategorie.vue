<template>
  <div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue"
// import BoardView from "@/views/BoardView.vue"
import { useCategorieStore } from "../stores/categorie"
const store = useCategorieStore()
const newCategorie = ref("")
const editingId = ref<number|null>(null)
const editedName = ref("")
onMounted(() => {
  store.fetchCategories()
})
const addNewCategory = () => {
  if (newCategorie.value.trim() !== "") {
    store.addCategory({ name: newCategorie.value })
    newCategorie.value = ""
  }
}
const startEdit = (cat: any) => {
  editingId.value = cat.id
  editedName.value = cat.name
}
const cancelEdit = () => {
  editingId.value = null
  editedName.value = ""
}
const confirmEdit = (id: number) => {
  if (editedName.value.trim() !== "") {
    store.updateCategory(id, { name: editedName.value })
    cancelEdit()
  }
}
</script>
