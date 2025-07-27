interface PageHeaderProps {
  title: string
  description: string
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="relative pb-8 mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-midnight mb-4">{title}</h1>
      <p className="text-lg text-shadow/80 leading-relaxed">{description}</p>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-hemlock via-shadow to-hemlock opacity-30 rounded-full"></div>
    </div>
  )
}