"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Grid, List } from "lucide-react"
import { AnimatedButton } from "@/components/ui/animated-button"
import { GradientText } from "@/components/ui/gradient-text"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { RippleButton } from "@/components/ui/ripple-button"
import { Card3D } from "@/components/ui/card-3d"
import { ParticleConnect } from "@/components/ui/particle-connect"
import { TextReveal } from "@/components/ui/text-reveal"
import { SearchAutocomplete } from "@/components/ui/search-autocomplete"
import { AdvancedFilters } from "@/components/ui/advanced-filters"
import { AdvancedPagination } from "@/components/ui/advanced-pagination"
import { SortControls } from "@/components/ui/sort-controls"
import { ContactForm } from "@/components/ui/contact-form"
import { ValidatedInput } from "@/components/ui/validated-input"
import { AnimatedSelect } from "@/components/ui/animated-select"
import { AnimatedTextarea } from "@/components/ui/animated-textarea"
import { ToggleSwitch } from "@/components/ui/toggle-switch"
import { AnimatedSlider } from "@/components/ui/animated-slider"
import { AnimatedCheckbox } from "@/components/ui/animated-checkbox"
import { AnimatedRadio } from "@/components/ui/animated-radio"
import { FileUpload } from "@/components/ui/file-upload"
import { ProductCard } from "@/components/ui/product-card"
import { UserCard } from "@/components/ui/user-card"
import { AdvancedTable } from "@/components/ui/advanced-table"
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip"
import { AnimatedPopover } from "@/components/ui/animated-popover"
import { AnimatedAccordion } from "@/components/ui/animated-accordion"
import { EnhancedTabs } from "@/components/ui/enhanced-tabs"
import { AnimatedStepper } from "@/components/ui/animated-stepper"
import { AnimatedAlert } from "@/components/ui/animated-alert"
import { SkeletonLoader } from "@/components/ui/skeleton-loader"
import { AdvancedSpinner } from "@/components/ui/advanced-spinner"
import { ProgressBar } from "@/components/ui/progress-bar"
import { AnimatedModal } from "@/components/ui/animated-modal"
import { useToast } from "@/components/ui/toast-system"
import { AnimatedChart } from "@/components/ui/animated-chart"
import { KPIIndicator } from "@/components/ui/kpi-indicator"
import { MobileMenu } from "@/components/ui/mobile-menu"
import { AccessibleButton } from "@/components/ui/accessible-button"
import { ResponsiveGrid } from "@/components/ui/responsive-grid"

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const [sortBy, setSortBy] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { addToast } = useToast()

  // Form states for demos
  const [inputValue, setInputValue] = useState("")
  const [selectValue, setSelectValue] = useState("")
  const [textareaValue, setTextareaValue] = useState("")
  const [toggleValue, setToggleValue] = useState(false)
  const [sliderValue, setSliderValue] = useState(50)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState("")

  const showToast = () => {
    addToast({
      variant: "success",
      title: "Toast Notification",
      description: "This is a beautiful animated toast!",
      duration: 4000,
      action: {
        label: "Undo",
        onClick: () => console.log("Undo clicked"),
      },
    })
  }

  const categories = [
    { id: "all", name: "All Components", count: 44 },
    { id: "buttons", name: "Buttons", count: 3 },
    { id: "forms", name: "Forms", count: 8 },
    { id: "data-display", name: "Data Display", count: 8 },
    { id: "feedback", name: "Feedback", count: 5 },
    { id: "analytics", name: "Analytics", count: 2 },
    { id: "responsive", name: "Responsive", count: 3 },
    { id: "layout", name: "Layout", count: 4 },
    { id: "navigation", name: "Navigation", count: 2 },
    { id: "typography", name: "Typography", count: 2 },
    { id: "cards", name: "Cards", count: 1 },
    { id: "effects", name: "Effects", count: 1 },
    { id: "search", name: "Search & Filters", count: 4 },
  ]

  const components = [
    // Navigation Components
    {
      id: 1,
      name: "Navbar",
      description: "Advanced navigation bar with dropdowns, search, and magnetic effects",
      category: "navigation",
      tags: ["navigation", "dropdown", "responsive", "magnetic"],
      complexity: "Medium",
      preview: (
        <div className="w-full h-20 bg-black/40 rounded-lg border border-white/10 flex items-center px-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <span className="text-black text-xs">⚡</span>
            </div>
            <span className="text-white font-bold">JARBS-UI</span>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-gray-300 text-sm">Components</span>
            <span className="text-gray-300 text-sm">Templates</span>
            <div className="bg-white text-black px-3 py-1 rounded text-sm">Get Started</div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      name: "Sidebar",
      description: "Collapsible sidebar with navigation, badges, and smooth animations",
      category: "navigation",
      tags: ["sidebar", "collapsible", "navigation", "animated"],
      complexity: "Medium",
      preview: (
        <div className="w-full h-40 bg-black/40 rounded-lg border border-white/10 flex">
          <div className="w-16 bg-black/60 rounded-l-lg p-2">
            <div className="space-y-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">🏠</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">📦</span>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs">🎨</span>
              </div>
            </div>
          </div>
          <div className="flex-1 p-3">
            <div className="space-y-2">
              <div className="w-20 h-2 bg-gray-500 rounded"></div>
              <div className="w-16 h-1 bg-gray-600 rounded"></div>
              <div className="w-18 h-1 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ),
    },

    // Form Components
    {
      id: 17,
      name: "Contact Form",
      description: "Complete contact/login/register forms with validation and animations",
      category: "forms",
      tags: ["form", "validation", "contact", "login", "register"],
      complexity: "Advanced",
      preview: <ContactForm variant="contact" className="max-w-sm" />,
    },
    {
      id: 18,
      name: "Validated Input",
      description: "Input fields with real-time validation and visual feedback",
      category: "forms",
      tags: ["input", "validation", "feedback", "animated"],
      complexity: "Medium",
      preview: (
        <ValidatedInput
          label="Email"
          type="email"
          value={inputValue}
          onChange={setInputValue}
          placeholder="Enter your email"
          rules={[
            { test: (val) => val.length > 0, message: "Email is required" },
            { test: (val) => /\S+@\S+\.\S+/.test(val), message: "Email is invalid" },
          ]}
        />
      ),
    },
    {
      id: 19,
      name: "Animated Select",
      description: "Dropdown selects with search, multiple selection, and smooth animations",
      category: "forms",
      tags: ["select", "dropdown", "search", "multiple"],
      complexity: "Advanced",
      preview: (
        <AnimatedSelect
          options={[
            { value: "react", label: "React", icon: "⚛️" },
            { value: "vue", label: "Vue", icon: "💚" },
            { value: "angular", label: "Angular", icon: "🅰️" },
            { value: "svelte", label: "Svelte", icon: "🧡" },
          ]}
          value={selectValue}
          onChange={setSelectValue}
          placeholder="Choose framework"
          searchable
        />
      ),
    },
    {
      id: 20,
      name: "Animated Textarea",
      description: "Auto-resizing textarea with character count and smooth animations",
      category: "forms",
      tags: ["textarea", "auto-resize", "character-count"],
      complexity: "Medium",
      preview: (
        <AnimatedTextarea
          label="Message"
          value={textareaValue}
          onChange={setTextareaValue}
          placeholder="Enter your message..."
          maxLength={200}
          autoResize
        />
      ),
    },
    {
      id: 21,
      name: "Toggle Switch",
      description: "Animated toggle switches with multiple variants and sizes",
      category: "forms",
      tags: ["toggle", "switch", "animated", "variants"],
      complexity: "Easy",
      preview: (
        <ToggleSwitch
          checked={toggleValue}
          onChange={setToggleValue}
          label="Enable notifications"
          description="Receive updates about new components"
          variant="success"
        />
      ),
    },
    {
      id: 22,
      name: "Animated Slider",
      description: "Interactive sliders with smooth animations and custom formatting",
      category: "forms",
      tags: ["slider", "range", "animated", "interactive"],
      complexity: "Medium",
      preview: (
        <AnimatedSlider
          value={sliderValue}
          onChange={setSliderValue}
          label="Volume"
          min={0}
          max={100}
          formatValue={(val) => `${val}%`}
          variant="gradient"
        />
      ),
    },
    {
      id: 23,
      name: "Animated Checkbox",
      description: "Checkboxes with smooth animations and multiple variants",
      category: "forms",
      tags: ["checkbox", "animated", "variants", "indeterminate"],
      complexity: "Easy",
      preview: (
        <AnimatedCheckbox
          checked={checkboxValue}
          onChange={setCheckboxValue}
          label="I agree to the terms"
          description="By checking this, you accept our terms and conditions"
          variant="success"
        />
      ),
    },
    {
      id: 24,
      name: "Animated Radio",
      description: "Radio button groups with smooth animations and layouts",
      category: "forms",
      tags: ["radio", "animated", "group", "layouts"],
      complexity: "Medium",
      preview: (
        <AnimatedRadio
          options={[
            { value: "small", label: "Small", description: "Perfect for mobile" },
            { value: "medium", label: "Medium", description: "Great for tablets" },
            { value: "large", label: "Large", description: "Best for desktop" },
          ]}
          value={radioValue}
          onChange={setRadioValue}
          name="size"
          variant="default"
        />
      ),
    },
    {
      id: 25,
      name: "File Upload",
      description: "Drag & drop file upload with progress tracking and previews",
      category: "forms",
      tags: ["upload", "drag-drop", "progress", "preview"],
      complexity: "Advanced",
      preview: <FileUpload maxFiles={3} maxSize={5} accept="image/*" />,
    },

    // Data Display Components
    {
      id: 26,
      name: "Product Card",
      description: "Interactive product cards with animations, ratings, and quick actions",
      category: "data-display",
      tags: ["product", "card", "ecommerce", "interactive"],
      complexity: "Advanced",
      preview: (
        <ProductCard
          product={{
            id: "1",
            name: "Wireless Headphones",
            price: 99.99,
            originalPrice: 129.99,
            image: "/placeholder.svg?height=200&width=200",
            rating: 4,
            reviews: 128,
            category: "Electronics",
            isNew: true,
            discount: 23,
          }}
          variant="compact"
        />
      ),
    },
    {
      id: 27,
      name: "User Card",
      description: "User profile cards with stats, actions, and online status",
      category: "data-display",
      tags: ["user", "profile", "card", "social"],
      complexity: "Medium",
      preview: (
        <UserCard
          user={{
            id: "1",
            name: "John Doe",
            username: "johndoe",
            avatar: "/placeholder.svg?height=48&width=48",
            role: "Developer",
            location: "San Francisco, CA",
            email: "john@example.com",
            joinDate: "Jan 2023",
            isOnline: true,
            followers: 1234,
            following: 567,
            posts: 89,
          }}
          variant="compact"
        />
      ),
    },
    {
      id: 28,
      name: "Advanced Table",
      description: "Feature-rich tables with sorting, filtering, pagination, and selection",
      category: "data-display",
      tags: ["table", "data", "sorting", "filtering"],
      complexity: "Advanced",
      preview: (
        <div className="w-full max-w-md">
          <AdvancedTable
            data={[
              { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
              { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
            ]}
            columns={[
              { key: "name", label: "Name", sortable: true },
              { key: "email", label: "Email", sortable: true },
              { key: "role", label: "Role", filterable: true },
            ]}
            pageSize={5}
            className="text-xs"
          />
        </div>
      ),
    },
    {
      id: 29,
      name: "Animated Modal",
      description: "Modals with blur effects, focus trap, and smooth animations",
      category: "data-display",
      tags: ["modal", "dialog", "overlay", "animated"],
      complexity: "Advanced",
      preview: <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>,
    },
    {
      id: 30,
      name: "Enhanced Tooltip",
      description: "Tooltips with multiple variants, positioning, and interactive content",
      category: "data-display",
      tags: ["tooltip", "hover", "interactive", "positioning"],
      complexity: "Medium",
      preview: (
        <EnhancedTooltip content="This is an enhanced tooltip with animations!" variant="colorful">
          <Button variant="outline">Hover me</Button>
        </EnhancedTooltip>
      ),
    },
    {
      id: 31,
      name: "Animated Popover",
      description: "Popovers with rich content, positioning, and smooth animations",
      category: "data-display",
      tags: ["popover", "dropdown", "positioning", "content"],
      complexity: "Advanced",
      preview: (
        <AnimatedPopover
          content={
            <div className="space-y-2">
              <h4 className="font-semibold text-white">Popover Content</h4>
              <p className="text-sm text-gray-300">This is a rich popover with animations.</p>
              <Button size="sm">Action</Button>
            </div>
          }
          title="Settings"
        >
          <Button variant="outline">Open Popover</Button>
        </AnimatedPopover>
      ),
    },
    {
      id: 32,
      name: "Animated Accordion",
      description: "Accordions with smooth animations and multiple variants",
      category: "data-display",
      tags: ["accordion", "collapsible", "animated", "content"],
      complexity: "Medium",
      preview: (
        <AnimatedAccordion
          items={[
            {
              id: "1",
              title: "What is JARBS-UI?",
              content: "A modern component library with amazing animations.",
            },
            {
              id: "2",
              title: "How to install?",
              content: "Simply copy and paste the components you need.",
            },
          ]}
          variant="minimal"
        />
      ),
    },
    {
      id: 33,
      name: "Enhanced Tabs",
      description: "Tabs with animations, badges, icons, and multiple layouts",
      category: "data-display",
      tags: ["tabs", "navigation", "animated", "layouts"],
      complexity: "Medium",
      preview: (
        <EnhancedTabs
          items={[
            {
              id: "overview",
              label: "Overview",
              content: <div className="p-4 text-gray-300">Overview content</div>,
            },
            {
              id: "details",
              label: "Details",
              badge: "2",
              content: <div className="p-4 text-gray-300">Details content</div>,
            },
          ]}
          variant="pills"
          size="sm"
        />
      ),
    },
    {
      id: 34,
      name: "Animated Stepper",
      description: "Step-by-step processes with progress tracking and animations",
      category: "data-display",
      tags: ["stepper", "progress", "workflow", "animated"],
      complexity: "Advanced",
      preview: (
        <AnimatedStepper
          steps={[
            {
              id: "1",
              title: "Setup",
              content: <div className="text-gray-300">Setup your project</div>,
            },
            {
              id: "2",
              title: "Configure",
              content: <div className="text-gray-300">Configure settings</div>,
            },
            {
              id: "3",
              title: "Deploy",
              content: <div className="text-gray-300">Deploy your app</div>,
            },
          ]}
          variant="dots"
          showNavigation={false}
          className="max-w-sm"
        />
      ),
    },

    // Feedback Components
    {
      id: 35,
      name: "Animated Alert",
      description: "Alerts with smooth animations for success, error, info, and warning states",
      category: "feedback",
      tags: ["alert", "notification", "animated", "dismissible"],
      complexity: "Medium",
      preview: (
        <AnimatedAlert
          variant="success"
          title="Success!"
          description="Your action was completed successfully."
          dismissible
        />
      ),
    },
    {
      id: 36,
      name: "Toast System",
      description: "Toast notifications with auto-dismiss, actions, and smooth animations",
      category: "feedback",
      tags: ["toast", "notification", "system", "animated"],
      complexity: "Advanced",
      preview: <Button onClick={showToast}>Show Toast</Button>,
    },
    {
      id: 37,
      name: "Skeleton Loader",
      description: "Loading skeletons for text, avatars, cards, and tables with shimmer effects",
      category: "feedback",
      tags: ["skeleton", "loading", "shimmer", "placeholder"],
      complexity: "Medium",
      preview: <SkeletonLoader variant="avatar" className="max-w-xs" />,
    },
    {
      id: 38,
      name: "Advanced Spinner",
      description: "Multiple spinner variants with different animations and styles",
      category: "feedback",
      tags: ["spinner", "loading", "animated", "variants"],
      complexity: "Medium",
      preview: (
        <div className="flex gap-4 items-center">
          <AdvancedSpinner variant="dots" color="primary" />
          <AdvancedSpinner variant="bars" color="success" />
          <AdvancedSpinner variant="orbit" color="warning" />
        </div>
      ),
    },
    {
      id: 39,
      name: "Progress Bar",
      description: "Progress bars with gradients, animations, and multiple variants",
      category: "feedback",
      tags: ["progress", "bar", "animated", "gradient"],
      complexity: "Medium",
      preview: (
        <div className="space-y-3 w-full max-w-xs">
          <ProgressBar value={75} variant="gradient" color="primary" showPercentage />
          <ProgressBar value={45} variant="glow" color="success" showValue max={100} />
        </div>
      ),
    },

    // Analytics Components
    {
      id: 40,
      name: "Animated Chart",
      description: "Interactive charts with animations for bars, lines, pie, and more",
      category: "analytics",
      tags: ["chart", "data", "visualization", "animated"],
      complexity: "Advanced",
      preview: (
        <AnimatedChart
          data={[
            { label: "Jan", value: 65 },
            { label: "Feb", value: 78 },
            { label: "Mar", value: 90 },
            { label: "Apr", value: 81 },
          ]}
          type="bar"
          width={300}
          height={200}
          className="max-w-xs"
        />
      ),
    },
    {
      id: 41,
      name: "KPI Indicator",
      description: "Key performance indicators with trends, animations, and multiple variants",
      category: "analytics",
      tags: ["kpi", "metrics", "dashboard", "animated"],
      complexity: "Medium",
      preview: (
        <KPIIndicator
          title="Revenue"
          value={125000}
          prefix="$"
          trend="up"
          trendValue={12.5}
          variant="success"
          size="sm"
        />
      ),
    },

    // Responsive Components
    {
      id: 42,
      name: "Mobile Menu",
      description: "Responsive mobile navigation with smooth animations and nested items",
      category: "responsive",
      tags: ["mobile", "navigation", "responsive", "animated"],
      complexity: "Advanced",
      preview: (
        <MobileMenu
          items={[
            { label: "Home", href: "/" },
            { label: "Components", href: "/components" },
            { label: "About", href: "/about" },
          ]}
        />
      ),
    },
    {
      id: 43,
      name: "Accessible Button",
      description: "Buttons with full accessibility support, ARIA labels, and keyboard navigation",
      category: "responsive",
      tags: ["accessibility", "button", "aria", "keyboard"],
      complexity: "Medium",
      preview: (
        <AccessibleButton ariaLabel="Save document" announceOnClick="Document saved successfully" focusRing>
          Save Document
        </AccessibleButton>
      ),
    },
    {
      id: 44,
      name: "Responsive Grid",
      description: "Flexible grid system with responsive breakpoints and gap controls",
      category: "responsive",
      tags: ["grid", "responsive", "layout", "breakpoints"],
      complexity: "Easy",
      preview: (
        <ResponsiveGrid cols={{ default: 1, md: 2, lg: 3 }} gap={4} className="max-w-xs">
          <div className="bg-white/10 p-4 rounded">Item 1</div>
          <div className="bg-white/10 p-4 rounded">Item 2</div>
          <div className="bg-white/10 p-4 rounded">Item 3</div>
        </ResponsiveGrid>
      ),
    },

    // Layout Components
    {
      id: 3,
      name: "Enhanced Footer",
      description: "Complete footer with newsletter, social links, and animated sections",
      category: "layout",
      tags: ["footer", "newsletter", "social", "animated"],
      complexity: "Medium",
      preview: (
        <div className="w-full h-32 bg-black/40 rounded-lg border border-white/10 p-4">
          <div className="grid grid-cols-4 gap-4 h-full">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-4 h-4 bg-white rounded"></div>
                <span className="text-white text-xs font-bold">JARBS-UI</span>
              </div>
              <div className="space-y-1">
                <div className="w-16 h-1 bg-gray-600 rounded"></div>
                <div className="w-12 h-1 bg-gray-600 rounded"></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="w-12 h-2 bg-gray-500 rounded"></div>
              <div className="w-8 h-1 bg-gray-600 rounded"></div>
              <div className="w-10 h-1 bg-gray-600 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="w-12 h-2 bg-gray-500 rounded"></div>
              <div className="w-8 h-1 bg-gray-600 rounded"></div>
              <div className="w-10 h-1 bg-gray-600 rounded"></div>
            </div>
            <div className="space-y-1">
              <div className="w-12 h-2 bg-gray-500 rounded"></div>
              <div className="w-8 h-1 bg-gray-600 rounded"></div>
              <div className="w-10 h-1 bg-gray-600 rounded"></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 45,
      name: "Enhanced Header",
      description: "Advanced header with search, notifications, and user menu",
      category: "layout",
      tags: ["header", "navigation", "search", "notifications"],
      complexity: "Advanced",
      preview: (
        <div className="w-full h-16 bg-black/40 rounded-lg border border-white/10 flex items-center px-4">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black text-xs">⚡</span>
            </div>
            <span className="text-white font-bold text-sm">JARBS-UI</span>
          </div>
          <div className="ml-auto flex items-center space-x-3">
            <div className="w-32 h-6 bg-white/10 rounded"></div>
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
            <div className="w-6 h-6 bg-white/20 rounded-full"></div>
          </div>
        </div>
      ),
    },
    {
      id: 46,
      name: "Container",
      description: "Responsive container with max-width constraints and padding",
      category: "layout",
      tags: ["container", "responsive", "layout", "wrapper"],
      complexity: "Easy",
      preview: (
        <div className="w-full h-20 bg-black/40 rounded-lg border border-white/10 flex items-center justify-center">
          <div className="bg-white/10 px-4 py-2 rounded text-white text-sm">Responsive Container</div>
        </div>
      ),
    },
    {
      id: 47,
      name: "Stack Layout",
      description: "Vertical and horizontal stack layouts with spacing controls",
      category: "layout",
      tags: ["stack", "layout", "spacing", "flex"],
      complexity: "Easy",
      preview: (
        <div className="w-full h-24 bg-black/40 rounded-lg border border-white/10 p-4">
          <div className="flex flex-col space-y-2">
            <div className="w-full h-3 bg-white/20 rounded"></div>
            <div className="w-3/4 h-3 bg-white/20 rounded"></div>
            <div className="w-1/2 h-3 bg-white/20 rounded"></div>
          </div>
        </div>
      ),
    },

    // Search & Filter Components
    {
      id: 13,
      name: "Search Autocomplete",
      description: "Advanced search with autocomplete, recent searches, and trending results",
      category: "search",
      tags: ["search", "autocomplete", "trending", "recent"],
      complexity: "Advanced",
      preview: <SearchAutocomplete placeholder="Search components..." />,
    },
    {
      id: 14,
      name: "Advanced Filters",
      description: "Comprehensive filtering system with checkboxes, ranges, and dropdowns",
      category: "search",
      tags: ["filters", "checkboxes", "ranges", "dropdown"],
      complexity: "Advanced",
      preview: <AdvancedFilters />,
    },
    {
      id: 15,
      name: "Advanced Pagination",
      description: "Feature-rich pagination with items per page and navigation controls",
      category: "search",
      tags: ["pagination", "navigation", "items-per-page"],
      complexity: "Medium",
      preview: (
        <AdvancedPagination currentPage={2} totalPages={10} totalItems={95} itemsPerPage={10} onPageChange={() => {}} />
      ),
    },
    {
      id: 16,
      name: "Sort Controls",
      description: "Flexible sorting controls with multiple variants and direction indicators",
      category: "search",
      tags: ["sort", "controls", "direction", "variants"],
      complexity: "Medium",
      preview: (
        <SortControls
          options={[
            { id: "name", label: "Name", field: "name" },
            { id: "date", label: "Date", field: "date" },
            { id: "popularity", label: "Popular", field: "views" },
          ]}
          currentSort="name"
          currentDirection="asc"
          onSortChange={() => {}}
          variant="hybrid"
        />
      ),
    },

    // Button Components
    {
      id: 6,
      name: "Animated Button",
      description: "Interactive button with hover effects and micro-animations",
      category: "buttons",
      tags: ["animation", "interactive", "hover"],
      complexity: "Easy",
      preview: <AnimatedButton>Click me</AnimatedButton>,
    },
    {
      id: 8,
      name: "Magnetic Button",
      description: "Button that attracts to cursor with smooth magnetic effects",
      category: "buttons",
      tags: ["magnetic", "interactive", "smooth"],
      complexity: "Medium",
      preview: (
        <MagneticButton>
          <Button className="bg-white text-black hover:bg-gray-200">Hover me!</Button>
        </MagneticButton>
      ),
    },
    {
      id: 9,
      name: "Ripple Button",
      description: "Button with beautiful ripple click animations",
      category: "buttons",
      tags: ["ripple", "click", "animation"],
      complexity: "Medium",
      preview: <RippleButton className="bg-white text-black hover:bg-gray-200">Click me!</RippleButton>,
    },

    // Typography Components
    {
      id: 7,
      name: "Gradient Text",
      description: "Beautiful gradient text effects with customizable colors",
      category: "typography",
      tags: ["gradient", "text", "visual"],
      complexity: "Easy",
      preview: <GradientText>Gradient Text</GradientText>,
    },
    {
      id: 12,
      name: "Text Reveal",
      description: "Cinematic text animations with stunning effects",
      category: "typography",
      tags: ["reveal", "cinematic", "animation"],
      complexity: "Medium",
      preview: <TextReveal text="AMAZING" />,
    },

    // Card Components
    {
      id: 10,
      name: "3D Card",
      description: "Interactive 3D cards that respond to mouse movement",
      category: "cards",
      tags: ["3d", "interactive", "hover"],
      complexity: "Advanced",
      preview: <Card3D />,
    },

    // Effects Components
    {
      id: 11,
      name: "Particle Connect",
      description: "Dynamic particle system with connecting lines",
      category: "effects",
      tags: ["particles", "dynamic", "connections"],
      complexity: "Advanced",
      preview: <ParticleConnect />,
    },
  ]

  const filteredComponents = components.filter((component) => {
    const matchesSearch =
      component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || component.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Sort components
  const sortedComponents = [...filteredComponents].sort((a, b) => {
    let aValue: any = a[sortBy as keyof typeof a]
    let bValue: any = b[sortBy as keyof typeof b]

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Paginate components
  const totalPages = Math.ceil(sortedComponents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedComponents = sortedComponents.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <GradientText>Component Library</GradientText>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover our collection of {components.length} beautifully crafted components with stunning animations and
            modern design.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SearchAutocomplete
              placeholder="Search components..."
              value={searchQuery}
              onChange={setSearchQuery}
              className="w-full md:w-96"
            />
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="flex items-center gap-2"
              >
                {category.name}
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <SortControls
              options={[
                { id: "name", label: "Name", field: "name" },
                { id: "complexity", label: "Complexity", field: "complexity" },
                { id: "category", label: "Category", field: "category" },
              ]}
              currentSort={sortBy}
              currentDirection={sortDirection}
              onSortChange={(field, direction) => {
                setSortBy(field)
                setSortDirection(direction)
              }}
              variant="hybrid"
            />
            <div className="text-sm text-gray-400">
              Showing {paginatedComponents.length} of {filteredComponents.length} components
            </div>
          </div>
        </div>

        {/* Components Grid */}
        <div
          className={cn(
            "mb-8",
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4",
          )}
        >
          {paginatedComponents.map((component) => (
            <Card
              key={component.id}
              className="bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white">{component.name}</CardTitle>
                    <CardDescription className="text-gray-400 mt-1">{component.description}</CardDescription>
                  </div>
                  <Badge
                    variant={
                      component.complexity === "Easy"
                        ? "default"
                        : component.complexity === "Medium"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {component.complexity}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {component.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {component.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{component.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-black/40 rounded-lg p-4 mb-4 min-h-[120px] flex items-center justify-center">
                  {component.preview}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Code
                  </Button>
                  <Button size="sm" variant="outline">
                    Copy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center">
            <AdvancedPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredComponents.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatedModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Example Modal"
        description="This is a beautiful animated modal with blur effects."
        size="md"
      >
        <div className="space-y-4">
          <p className="text-gray-300">
            This modal demonstrates the smooth animations and blur effects. You can customize the size, animations, and
            content.
          </p>
          <div className="flex gap-2 justify-end">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>Confirm</Button>
          </div>
        </div>
      </AnimatedModal>
    </div>
  )
}
