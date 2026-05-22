import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Colors } from '../constants/Colors';

const CustomCheckbox = ({
    isChecked,
    onCheck,
    title
}) => {
    return (
        <Pressable
            style={styles.container}
            onPress={onCheck}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: isChecked }}
        >
            <View style={[styles.checkbox, isChecked && styles.checkboxChecked]}>
                {isChecked && <Text style={styles.checkmark}>✓</Text>}
            </View>

            {title && <Text style={styles.title}>{title}</Text>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: Colors.primary,
        borderColor: Colors.primary,
    },
    checkmark: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    title: {
        color: Colors.darkCharcoal,
    },
});

export default CustomCheckbox;