import { defineStore } from 'pinia'
import api from "@/api.js";
// const api = axios.create({
//   baseURL: 'http://localhost:8888/wp-json/wp/v2',
//   headers: {
//     'Authorization': 'Basic ' + btoa('kevin.hien@epitech.eu:ROOT'),
//     'Content-Type': 'application/json'
//   }
// })

export const useCategorieStore = defineStore('categorie', {
  state: () => ({
    categories: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchCategories() {
      this.loading = true
      this.error = null
      try {
        const res = await api.get('/categories')
        this.categories = res.data
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erreur lors du chargement"
      } finally {
        this.loading = false
      }
    },

    async addCategory(payload: { name: string }) {
      this.loading = true
      this.error = null
      try {
        await api.post('/categories', payload)
        await this.fetchCategories()
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erreur lors de l'ajout"
      } finally {
        this.loading = false
      }
    },

    async updateCategory(id: number, updatedData: any) {
      this.loading = true
      this.error = null
      try {
        await api.put(`/categories/${id}`, updatedData)
        await this.fetchCategories()
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erreur lors de la mise à jour"
      } finally {
        this.loading = false
      }
    },

    async deleteCategory(id: number) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/categories/${id}?force=true`)
        await this.fetchCategories()
      } catch (err: any) {
        this.error = err.response?.data?.message || "Erreur lors de la suppression"
      } finally {
        this.loading = false
      }
    }
  }
})
