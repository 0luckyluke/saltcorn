// post/delete/:name/:id
export const deleteRows = async (context) => {
  const { name, id } = context.params;
  try {
    const table = await saltcorn.data.models.Table.findOne({ name });
    const state = saltcorn.data.state.getState();
    if (state.localTableIds.indexOf(table.id) >= 0) {
      await table.deleteRows({ id });
    } else {
      await apiCall({ method: "POST", path: `/delete/${name}/${id}` });
    }
    const redirect = new URLSearchParams(context.query).get("redirect");
    return { redirect };
  } catch (error) {
    // TODO ch message?
    return null;
  }
};
