import { defineStore } from 'pinia'
import api from "@/api.js";

export const useCommentStore = defineStore('comment', {

  state: () => ({
    comments: [],
    selectComments: {
      comment: ''
    },
  }),
  actions: {

    async fetchComments() {
      const res = await api.get('/comments')
      this.comments = res.data
    },

    async deleteComment(id: number) {
      await api.delete(`/comments/${id}`)
      this.fetchComments()
    },
    async AddComment(comment: { content: string; post?: number }) {
      try {
        await api.post(`/comments`, comment)
        this.fetchComments()
      } catch (error) {
        console.log('Erreur lors du post: ', error)
      }
    },

    async fetchCommentsId(id: number) {
      const res = await api.get(`comments/${id}`)
      this.selectComments = res.data.content.rendered
    },

    async updateComment(id: number, updateData: string) {
      await api.put(`/comments/${id}`, updateData)
      this.fetchComments()
    }
  }
})
