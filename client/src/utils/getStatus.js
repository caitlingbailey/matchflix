function getMatchStatus(matchObject) {
    console.log(`getStatus: `, matchObject);
    if (matchObject?.movies_final?.length) {
        return { stage: "complete"}
    } else if (matchObject?.genres_final?.length) {
        return { stage: "movies", player: "player1"}
    } else if (matchObject?.genres_player1?.length) {
        return { stage: "genres", player: "player2"}
    } else {
        return { stage: "unknown"}
    }
}

export default getMatchStatus;