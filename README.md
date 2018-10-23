# swipe_multiple_card

### if touch event can not respond well, we modify the code

```
onMoveShouldSetPanResponder:(evt, gestureState) => {
    const { moveX, moveY, dx, dy } = gestureState
    if( dx > 5 || dy > 5) {
        return true
    }else {
        return false
    }

}
```
