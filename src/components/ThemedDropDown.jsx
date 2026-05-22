import { useColorScheme } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { Colors } from '../constants/Colors'
import { useAppTheme } from '../stores/useAppTheme'

const ThemedDropDown = ({
    data,
    style = {},
    value,
    onChange,
    placeholder = "Select an option...",
    placeholderStyle = {},
    selectedTextStyle = {},
    labelField = "label",
    valueField = "value", ...props }) => {
    const colorScheme = useAppTheme()
    const theme = Colors[colorScheme] ?? Colors.light

    // console.log("Dropdown data: ", data)
    // console.log("Label Field: ", labelField)
    // console.log("Value Field: ", valueField)

    return (
        <Dropdown
            style={
                [{
                    backgroundColor: theme.uiBackground,
                    color: theme.text,
                    padding: 20,
                    borderWidth: 1,
                    borderColor: theme.iconColor,
                    borderRadius: 5
                }, style]}
            itemContainerStyle={{ backgroundColor: theme.background }}
            itemTextStyle={{ color: theme.text, }}
            placeholderStyle={[placeholderStyle, { color: theme.text }]}
            selectedTextStyle={[selectedTextStyle, { color: theme.text }]}
            activeColor={theme.uiBackground}
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        />
    )
}

export default ThemedDropDown