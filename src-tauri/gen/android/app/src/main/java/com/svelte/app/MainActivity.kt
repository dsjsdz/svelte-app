package com.svelte.app

import android.os.Bundle
import androidx.activity.enableEdgeToEdge

class MainActivity : TauriActivity() {
  override fun onCreate(savedInstanceState: Bundle?) {
    enableEdgeToEdge()
    super.onCreate(savedInstanceState)
  }

  /**
   * Overrides the default onBackPressed method to do nothing.
   * This is useful for scenarios where we want to prevent the user from
   * going back to the previous activity.
   */
  override fun onBackPressed() {
    // 禁用页面侧滑返回
  }
}
