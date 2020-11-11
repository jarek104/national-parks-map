export function convertSnaps<T>(snaps) {  
  if (!snaps) {
    return
  }
  return <T[]> snaps.map(item => {
    return {
      id: item.payload.doc.id,
      ...item.payload.doc.data() as {},
    }
  })
}
