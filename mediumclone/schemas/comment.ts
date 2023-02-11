import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'approved',
      type: 'boolean',
      title: 'Approved',
      description: "comment won't show on the screen without approvel",
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'comment',
      type: 'text',
    }),
    defineField({
      name: 'post',
      type: 'reference',
      to: [{type: 'post'}],
    }),
  ],
})
