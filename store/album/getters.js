export default {
    statusPostAlbum: state => state.postAlbum.status,
    statusPutAlbum: state => state.putAlbum.status,
    albumDetailData: state => state.albumDetail,
    albumDetailResult: state =>  state.albumDetail.result,
    listAlbumResult: state =>  state.listAlbum.result && state.listAlbum.result.items,
    statuslistAlbum: state => state.listAlbum.status,
    requestlistAlbum: state => state.listAlbum.requesting,
    requestPostAlbum: state => state.postAlbum.requesting,
    requestPutAlbum: state => state.putAlbum.requesting,
    getDeleteAlbumDetailStatus: state => state.deleteAlbumDetail.status
}
