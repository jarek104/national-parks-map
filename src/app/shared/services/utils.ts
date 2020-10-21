export function convertSnaps<T>(snaps) {
  if (!snaps) {
    return
  }
  return <T[]> snaps.map(item => {
    // console.log('item', item);

    return {
      id: item.payload.doc.id,
      ...item.payload.doc.data() as {},
    }
  })
}
