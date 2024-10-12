import com.vanniktech.maven.publish.SonatypeHost
import org.jetbrains.kotlin.gradle.ExperimentalKotlinGradlePluginApi
import org.jetbrains.kotlin.gradle.dsl.JvmTarget

val libraryName = "Pawnote"

version = "0.0.0"

plugins {
  alias(libs.plugins.kotlinMultiplatform)
  alias(libs.plugins.androidLibrary)
  id("com.vanniktech.maven.publish") version "0.29.0"
}

kotlin {
  jvm()
  androidTarget {
    publishLibraryVariants("release")
    @OptIn(ExperimentalKotlinGradlePluginApi::class)
    compilerOptions { jvmTarget.set(JvmTarget.JVM_1_8) }
  }

  sourceSets {
    val commonMain by getting {
      dependencies {
        implementation(libs.ktor.client.core)
        implementation(libs.ktor.client.okhttp)

        implementation(libs.kotlinx.serialization.json)
        implementation(libs.kotlinx.serialization.core)

        implementation(libs.kotlinx.datetime)
      }
    }
    val commonTest by getting { dependencies { implementation(libs.kotlin.test) } }
    val jvmMain by getting {
      dependencies {
        implementation(libs.ktor.client.okhttp)
        implementation(libs.kotlin.test)
      }
    }
    val androidMain by getting {
      dependsOn(jvmMain)
      dependencies { implementation(libs.ktor.client.okhttp) }
    }
  }
}

val groupName = "ink.literate"
val idLibraryName = libraryName.lowercase()

group = groupName

android {
  namespace = groupName
  compileSdk = libs.versions.android.compileSdk.get().toInt()
  defaultConfig { minSdk = libs.versions.android.minSdk.get().toInt() }
}

mavenPublishing {
  coordinates(groupName, idLibraryName, version.toString())

  pom {
    name = libraryName
    description = "A purrfect API wrapper for PRONOTE."
    inceptionYear = "2024"

    url = "https://docs.literate.ink/$idLibraryName"

    licenses {
      license {
        name.set("GPL-3.0-or-later")
        url.set("https://www.gnu.org/licenses/gpl-3.0.txt")
        distribution.set("https://www.gnu.org/licenses/gpl-3.0.txt")
      }
    }

    developers {
      developer {
        organization = "LiterateInk"
        organizationUrl = "https://literate.ink"
      }
    }

    scm {
      url = "https://github.com/LiterateInk/$libraryName"
      connection = "scm:git:https://github.com/LiterateInk/$libraryName.git"
      developerConnection = "scm:git:https://github.com/LiterateInk/$libraryName.git"
    }
  }

  publishToMavenCentral(SonatypeHost.CENTRAL_PORTAL, automaticRelease = true)
  signAllPublications()
}
