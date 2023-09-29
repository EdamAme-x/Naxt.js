export default function Profile({ context }) {
  return context.html(`
        My name is ${context.req.param("name")}
    `);
}
