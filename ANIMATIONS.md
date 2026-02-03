# 🎨 Animation Implementation Guide

## Overview
This document outlines all the beautiful animations added to the Amora AI wedding planning landing page using **Framer Motion**. The animations are designed to create a premium, engaging user experience with smooth transitions and delightful micro-interactions.

## 🎯 Animation Philosophy
- **Smooth & Natural**: All animations use custom easing curves `[0.25, 0.4, 0.25, 1]` for natural motion
- **Performance-First**: Animations trigger on viewport entry with `once: true` to prevent re-animations
- **User-Centric**: Scroll indicators and smooth scrolling enhance navigation
- **Consistent Timing**: Staggered delays create a cascading reveal effect

## 📦 Components Created

### 1. **AnimatedSection Component** (`components/animations/AnimatedSection.tsx`)
Reusable wrapper component for scroll-triggered animations.

**Features:**
- `AnimatedSection` - Main wrapper with directional animations (up, down, left, right, none)
- `FadeIn` - Simple fade-in effect
- `ScaleIn` - Scale and fade animation
- `StaggerContainer` - Container for staggered child animations

**Usage:**
```tsx
<AnimatedSection direction="up" delay={0.1}>
  <YourComponent />
</AnimatedSection>
```

### 2. **ScrollIndicator Component** (`components/animations/ScrollIndicator.tsx`)
Animated scroll indicator with bouncing animation.

**Features:**
- Smooth fade-in on page load
- Continuous bouncing animation
- Click to scroll functionality
- Auto-hides after initial interaction

## 🎬 Page-Level Animations

### **Main Landing Page** (`app/page.tsx`)
All sections wrapped with `AnimatedSection` for smooth scroll reveals:
- Planner Section
- AI Features Section
- Wedding Planning Section
- Services Overview Section
- Featured Planner Section
- Venue Description Section
- Footer

## 🎭 Section-Specific Animations

### **1. Navbar** (`components/layout/navbar.tsx`)
**Animations:**
- Slide down from top on page load
- Logo slides in from left
- Buttons slide in from right
- Hover scale effect on buttons (1.05x)
- Tap scale effect (0.95x)

**Timing:**
- Navbar: 0s delay
- Logo: 0.2s delay
- Buttons: 0.3s delay

### **2. Hero Section** (`components/landing/HeroScetion.tsx`)
**Animations:**
- Background image zoom-in effect (1.1x to 1x scale)
- Overlay fade-in
- Heading slides up with fade (0.3s delay)
- Description slides up with fade (0.5s delay)
- CTA button slides up with fade (0.7s delay)
- Scroll indicator with bouncing animation
- Button hover scale (1.05x)

**Special Effects:**
- Parallax-style background animation
- Staggered text reveal for premium feel

### **3. Planner Section** (`components/landing/PlannerSection.tsx`)
**Animations:**
- Image slides in from left
- Text content slides in from right
- Heading, description, and button have individual delays
- Button hover scale effect

**Timing:**
- Image: 0s delay
- Heading: 0.2s delay
- Description: 0.3s delay
- Button: 0.4s delay

### **4. AI Features Section** (`components/landing/AIFeaturesSection.tsx`)
**Animations:**
- Heading fades in from below
- Description fades in with delay
- Feature cards stagger in (0.1s between each)
- Cards lift on hover (-8px)

**Stagger Effect:**
- Card 1: 0s delay
- Card 2: 0.1s delay
- Card 3: 0.2s delay
- Card 4: 0.3s delay

### **5. Wedding Planning Section** (`components/landing/WeddingPlanningSection.tsx`)
**Animations:**
- Alternating slide directions for visual interest
- Images slide from their respective sides
- Text content slides from opposite direction
- Hover scale on images (1.02x)
- Button hover effects

**Pattern:**
- Left image: slides from left, text from right
- Right image: text from left, image from right

## 🎨 Global Styles

### **Smooth Scroll** (`app/globals.css`)
```css
html {
  scroll-behavior: smooth;
}
```

## ⚡ Performance Optimizations

1. **Viewport Optimization**: 
   - `viewport={{ once: true }}` prevents re-animation
   - `margin: '-50px'` or `'-100px'` for early trigger

2. **GPU Acceleration**:
   - Transform properties (translate, scale) use GPU
   - Opacity transitions are hardware-accelerated

3. **Reduced Motion**:
   - All animations respect user's motion preferences
   - Framer Motion automatically handles `prefers-reduced-motion`

## 🎯 Animation Timing Reference

| Element | Duration | Delay | Easing |
|---------|----------|-------|--------|
| Navbar | 0.6s | 0s | Custom |
| Hero Background | 1.5s | 0s | Custom |
| Hero Heading | 0.8s | 0.3s | Custom |
| Hero Description | 0.8s | 0.5s | Custom |
| Hero CTA | 0.8s | 0.7s | Custom |
| Section Fade-in | 0.6s | 0.1s | Custom |
| Feature Cards | 0.5s | Staggered 0.1s | Custom |
| Images | 0.7s | 0.2s | Custom |
| Text Content | 0.7s | 0.3s | Custom |

## 🔧 Customization

### Changing Animation Speed
Adjust the `duration` property:
```tsx
transition={{ duration: 0.8 }} // Slower
transition={{ duration: 0.4 }} // Faster
```

### Changing Animation Direction
Use the `direction` prop:
```tsx
<AnimatedSection direction="left">  // Slide from left
<AnimatedSection direction="right"> // Slide from right
<AnimatedSection direction="up">    // Slide from bottom
<AnimatedSection direction="down">  // Slide from top
```

### Adjusting Stagger Timing
Modify the delay multiplier:
```tsx
delay: index * 0.15  // Slower stagger
delay: index * 0.05  // Faster stagger
```

## 🎪 Interactive Elements

All buttons include:
- `whileHover={{ scale: 1.05 }}` - Subtle grow on hover
- `whileTap={{ scale: 0.95 }}` - Press feedback
- Smooth transitions with `transition-all duration-300`

## 📱 Responsive Behavior

All animations are:
- Fully responsive across devices
- Touch-friendly with tap animations
- Optimized for mobile performance
- Respect reduced motion preferences

## 🚀 Best Practices

1. **Always use `once: true`** for scroll animations to prevent re-triggering
2. **Keep durations between 0.3s - 0.8s** for optimal UX
3. **Use stagger delays of 0.1s - 0.2s** for cascading effects
4. **Add hover states** to interactive elements
5. **Test on mobile devices** for performance

## 🎉 Result

The landing page now features:
- ✅ Smooth, professional animations
- ✅ Engaging scroll experience
- ✅ Premium feel with micro-interactions
- ✅ Excellent performance
- ✅ Accessibility-friendly
- ✅ Mobile-optimized

---

**Created with ❤️ using Framer Motion**
