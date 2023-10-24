import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VoucherCard from '../components/VoucherCard'

const MyVoucher = () => {
  return (
    <View style={styles.mainContainer}>
      <VoucherCard />
    </View>
  )
}

export default MyVoucher

const styles = StyleSheet.create({
    mainContainer:{
        padding: 16,
        backgroundColor: 'white'
    }
})