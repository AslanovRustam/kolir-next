import type { CollectionConfig } from 'payload'

// Заявки з сайту: брифи, контакт-форма, форма волонтера.
// Створюються ТІЛЬКИ з сервера (route /forms/submit через local API з
// overrideAccess) — публічного create немає, щоб не спамили напряму в REST.
export const Submissions: CollectionConfig = {
  slug: 'submissions',
  labels: { singular: 'Заявка', plural: 'Заявки' },
  admin: {
    useAsTitle: 'subject',
    defaultColumns: ['subject', 'kind', 'email', 'createdAt'],
  },
  access: {
    create: () => false,
    read: ({ req }) => Boolean(req.user),
    update: () => false,
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    { name: 'subject', type: 'text', admin: { readOnly: true } },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Бриф', value: 'brief' },
        { label: 'Контакт', value: 'contact' },
        { label: 'Волонтер', value: 'volunteer' },
      ],
      admin: { readOnly: true },
    },
    { name: 'briefType', type: 'text', admin: { readOnly: true } },
    { name: 'name', type: 'text', admin: { readOnly: true } },
    { name: 'email', type: 'text', admin: { readOnly: true } },
    { name: 'phone', type: 'text', admin: { readOnly: true } },
    {
      name: 'data',
      type: 'json',
      admin: { readOnly: true, description: 'Усі поля форми як їх надіслав користувач' },
    },
  ],
}
