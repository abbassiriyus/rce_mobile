import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Pagination({ totalPages, currentPage, onPageChange }) {
  const renderPageNumbers = () => {
    return [...Array(totalPages)].map((_, index) => {
      const pageNumber = index + 1;
      const isActive = currentPage === pageNumber;

      return (
        <TouchableOpacity
          key={pageNumber}
          onPress={() => onPageChange(pageNumber)}
          style={[
            styles.pageItem,
            isActive ? styles.activePage : styles.inactivePage,
          ]}
        >
          <Text style={isActive ? styles.activeText : styles.inactiveText}>
            {pageNumber}
          </Text>
        </TouchableOpacity>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={[
          styles.navButton,
          currentPage === 1 && styles.disabledButton,
        ]}
      >
        <Ionicons name="chevron-back" size={20} color="#fff" />
      </TouchableOpacity>

      {renderPageNumbers()}

      <TouchableOpacity
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[
          styles.navButton,
          currentPage === totalPages && styles.disabledButton,
        ]}
      >
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
