
module.exports.loadScene = function (director, nextSceneName) {
    let runningSceneCanvas = director.getScene().getChildByName('Canvas')
    runningSceneCanvas.getChildByName('Fade').runAction(
        cc.sequence(
            cc.fadeIn(1),
            cc.callFunc(() => director.loadScene(nextSceneName))
        )
    )
}

module.exports.fadeIn = function (director) {
    let newSceneCanvas = director.getScene().getChildByName('Canvas')
    newSceneCanvas.getChildByName('Fade').runAction(
        cc.fadeOut(1)
    );
}
