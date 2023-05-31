
# react-native-swipe-down-modal
Swipable bottom drawer component like Instagram's comment component.

  - Easy to use
  - Easy to customize
  - Smooth animation
  - No dependency
  - Works perfect with scrollview and flatlist
  - Swipable and unswipable modes

Originated to this package: react-native-swipe-modal-up-down



![swipable-modal-demo](https://user-images.githubusercontent.com/41010080/232225919-a55cf116-377d-4869-a196-1e0d2974e2bc.gif)


# Getting Started
```sh
$ npm install react-native-swipe-down-modal
```

# Usage
```sh
import { SwipeDownModal } from 'react-native-swipe-down-modal'
```

```javascript

  const SwipeDownTestScreen = () => {

    const [visible, setVisible] = useState(false)


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SwipeDownModal
                visible={visible}
                onClose={() => setVisible(false)}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                    <Text>Hello world</Text>
                </View>
            </SwipeDownModal>
            <Button
                title='Press to open'
                onPress={() => setVisible(true)}
            />
        </View>
    )

}

export default SwipeDownTestScreen;
```



# Using customized header, customized style and closing programmatically


```javascript
const SwipeDownTestScreen = () => {

    const [visible, setVisible] = useState(false)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SwipeDownModal
                visible={visible}
                onClose={() => setVisible(false)}
                backgroundColor={'rgba(0,0,0,.5)'}
                drawerBackgroundColor={'green'}
                borderTopRadius={20}
                swipeDisabled={true}
                marginTop={Dimensions.get("screen").height - 500}
                customHeader={
                    <View
                        style={{
                            height: 70,
                            padding: 10,
                            borderBottomColor: 'yellow',
                            borderBottomWidth: 3,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text>Foo</Text>
                        <TouchableOpacity
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 16,
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                right: 20,
                                top: 20,
                                position: 'absolute'
                            }}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={{ color: 'wheat' }}>X</Text>
                        </TouchableOpacity>
                    </View>
                }
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                    <Text>Hello world</Text>
                </View>
            </SwipeDownModal>
            <Button
                title='Press to open'
                onPress={() => setVisible(true)}
            />
        </View>
    )

}


export default SwipeDownTestScreen

```




![Ekran_Kaydı_2023-04-18_14_00_42_AdobeExpress](https://user-images.githubusercontent.com/41010080/232758351-bd7547fc-dbc8-4a86-b13f-3770c1deb99e.gif)




# Detailed styling and customizing 


```javascript
const SwipeDownTestScreen = () => {

    const [visible, setVisible] = useState(false)

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SwipeDownModal
                visible={visible}
                onClose={() => setVisible(false)}
                backgroundColor={'rgba(0,0,0,.5)'}
                borderTopRadius={20}
                marginTop={Dimensions.get("screen").height - 600}
                drawerBackgroundColor='transparent'
                customHeader={
                    <View
                        style={{
                            height: 60,
                            margin: 20,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 5,
                            borderTopRightRadius: 15,
                            borderBottomLeftRadius: 15,
                            overflow: 'hidden'
                        }}>
                        <Text style={{ fontSize: 30, color: 'red' }}>Title</Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'black',
                                alignItems: 'center',
                                justifyContent: 'center',
                                right: 0,
                                position: 'absolute',
                                width: 50,
                                height: '100%',
                                borderBottomLeftRadius: 15,
                            }}
                            onPress={() => setVisible(false)}
                        >
                           <Text style={{ color: 'wheat', fontSize: 20 }}>X</Text>
                        </TouchableOpacity>
                    </View>
                }
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        margin: 20,
                        marginTop: 30,
                        marginBottom: 50,
                        borderRadius: 20,
                        backgroundColor: 'wheat'
                    }}>
                    <Text style={{ fontSize: 30 }}>Hello world</Text>
                </View>
            </SwipeDownModal>
            <Button
                title='Press to open'
                onPress={() => setVisible(true)}
            />
        </View>
    )

}


export default SwipeDownTestScreen

```



![Ekran_Kaydı_2023-04-18_14_50_05_AdobeExpress](https://user-images.githubusercontent.com/41010080/232768743-b070e172-a042-46e2-9676-87e13c6bbea1.gif)




# props
                    
Prop | Type | Default | Description 
------------- | ------------- | ------------- | -------------
duration  | number | 200 | Duration of swipe animation in milliseconds
onClose  | func | () => null | The function will be called after the modal closed
customHeader  | react element | null | Custom header element 
visible  | boolean | false | Modal visibility
swipeThreshold  | number | 15 | Minimum dy value to trigger swipe animation
marginTop  | number | 71 | Margin to top of the screen. See image description. If you want to give certain height you can calculate it like this: marginTop={Dimensions.get("screen").height - yourHeight} 
swipableHeight | number | height of header component | Height of the area capturing the swipe. Outside of this area will not capture finger moves. See image description
backgroundColor | color string | 'rgba(0, 0, 0, .9)' | Color of the empty area between the modal body and the top of the screen
headerHeight | number | 40 | Height of the default header. This prop will take effect only if customHeader prop is null 
borderTopRadius | number | 38 | Border top right and left radius of drawer section
drawerBackgroundColor | color string | '#ffffff' | Background color of drawer section
swipeDisabled | boolean | false | When true, finger moves will not be captured



# Image description

![Adsız drawio (3)](https://user-images.githubusercontent.com/41010080/232230651-56db4379-55bf-4257-828c-53251f073df7.png)
