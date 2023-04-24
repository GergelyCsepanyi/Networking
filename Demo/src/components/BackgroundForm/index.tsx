import React from 'react';
import {
  KeyboardAvoidingView,
  View,
  Platform,
  StyleProp,
  ViewStyle,
  SafeAreaView,
  Text,
} from 'react-native';
import BackgroundFormStyles from './styles';

interface BackgroundFormProps {
  children: React.ReactNode;
  backgroundColor: string;
  headerProps: {title: string};

  additionalViewStyle?: StyleProp<ViewStyle>;
}

class BackgroundForm extends React.Component<BackgroundFormProps, {}> {
  render(): React.ReactNode {
    return (
      <SafeAreaView
        style={[
          BackgroundFormStyles.mainContainerStyle,
          {backgroundColor: this.props.backgroundColor},
        ]}>
        <View>
          <View style={BackgroundFormStyles.titleContainerStyle}>
            <Text style={BackgroundFormStyles.titleStyle}>
              {this.props.headerProps.title}
            </Text>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={[BackgroundFormStyles.childrenContainerStyle]}>
              {this.props.children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    );
  }
}

export default BackgroundForm;
